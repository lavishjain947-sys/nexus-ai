import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import axios from 'axios'
import User from '../models/User.js'
import { env } from '../config/env.js'

function generateToken(user) {
  return jwt.sign({ userId: user._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  })
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, password: hashed })

    const token = generateToken(user)
    res.status(201).json({ user, token })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(user)
    res.json({ user, token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function googleAuth(req, res) {
  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' })
    }

    if (!env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: 'Google OAuth not configured' })
    }

    const client = new OAuth2Client(env.GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { sub: googleId, email, name, picture } = payload

    let user = await User.findOne({ $or: [{ googleId }, { email }] })

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId
        if (!user.avatar && picture) user.avatar = picture
        await user.save()
      }
    } else {
      user = await User.create({
        name: name || 'Google User',
        email: email || `${googleId}@google.oauth`,
        googleId,
        avatar: picture || '',
      })
    }

    const token = generateToken(user)
    res.json({ user, token })
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(401).json({ error: 'Invalid Google credential' })
  }
}

export async function githubAuth(req, res) {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'GitHub authorization code is required' })
    }

    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
      return res.status(500).json({ error: 'GitHub OAuth not configured' })
    }

    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    )

    const accessToken = tokenResponse.data.access_token
    if (!accessToken) {
      return res.status(401).json({ error: 'Failed to get GitHub access token' })
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const { id: githubId, login, name, avatar_url } = userResponse.data

    const emailResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const primaryEmail = emailResponse.data.find((e) => e.primary)?.email || `${githubId}@github.oauth`

    let user = await User.findOne({ $or: [{ githubId }, { email: primaryEmail }] })

    if (user) {
      if (!user.githubId) {
        user.githubId = githubId
        if (!user.avatar && avatar_url) user.avatar = avatar_url
        await user.save()
      }
    } else {
      user = await User.create({
        name: name || login || 'GitHub User',
        email: primaryEmail,
        githubId,
        avatar: avatar_url || '',
      })
    }

    const token = generateToken(user)
    res.json({ user, token })
  } catch (error) {
    console.error('GitHub auth error:', error)
    res.status(401).json({ error: 'GitHub authentication failed' })
  }
}

export async function getMe(req, res) {
  res.json({ user: req.user })
}

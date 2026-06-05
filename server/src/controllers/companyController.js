import User from '../models/User.js'

const DEFAULT_SYSTEM_PROMPT =
  'You are Nexus AI, a flagship AI product built by Lavion Tech & Innovations, founded by Lavish Jain. You are helpful, intelligent, and concise. When asked who you are, always respond that you are Nexus AI, created by Lavion Tech & Innovations.'

export async function getCompanyConfig(req, res) {
  try {
    const user = await User.findById(req.user._id).select('companyPrompt')
    res.json({
      systemPrompt: user?.companyPrompt || DEFAULT_SYSTEM_PROMPT,
      companyName: 'Lavion Tech & Innovations',
      productName: 'Nexus AI',
      founder: 'Lavish Jain',
    })
  } catch (error) {
    console.error('Get company config error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function updateCompanyConfig(req, res) {
  try {
    const { systemPrompt } = req.body

    if (!systemPrompt || typeof systemPrompt !== 'string') {
      return res.status(400).json({ error: 'systemPrompt is required' })
    }

    if (systemPrompt.length > 2000) {
      return res.status(400).json({ error: 'systemPrompt must be under 2000 characters' })
    }

    await User.findByIdAndUpdate(req.user._id, { companyPrompt: systemPrompt })

    res.json({ systemPrompt })
  } catch (error) {
    console.error('Update company config error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

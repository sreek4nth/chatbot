import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: {
    type: String, // or ObjectId if users are registered
    required: true
  },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Chat', chatSchema);

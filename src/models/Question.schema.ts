import mongoose from 'mongoose';

const { Schema } = mongoose;

const QuestionSchema = new Schema({
    statement: {
        type: String
    },
    general_topic: {
        type: String
    },
    topic: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;

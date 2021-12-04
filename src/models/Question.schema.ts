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
    },
    complexity: {
        type: Number
    },
    options: [{
        variables: { type : Array , "default" : [] },
        answer: { type : Array , "default" : [] },
        complexity: { type: Number }
    }]
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;

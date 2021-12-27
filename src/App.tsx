import React from 'react';
import { Difficulty, ParamsQuiz } from 'api/quizApi';
import { Dispatch, Selector } from 'app/hooks';
import QuizCard from 'components/QuizCard';
import { getQuiz, nextQuestion } from 'features/quiz/quizSlice';
import 'antd/dist/antd.css';
import './App.scss';
import { publicUrl } from 'utils/utils';
import { Button, Form, Select, Skeleton } from 'antd';
import { notification } from "antd";
import { SmileOutlined } from '@ant-design/icons';

const { Option } = Select;

const App : React.FC = () => {
  const dispatch = Dispatch();
  const {
    loading,
    quizList,
    number,
    score,
    gameOver,
    answered,
    totalQuestion,
    userAnswer
  } = Selector(state => state.quiz);

  const hanndleStart = (values: ParamsQuiz) => {
    if(values.category==='all') {
      dispatch(getQuiz({amount: values.amount, difficulty: values.difficulty}))
    } else dispatch(getQuiz(values))
  }

  const notificationScore = () => {
    notification.open({
      message: 'Congratulations !!',
      description: `Score of previous round: ${score} ! Let's keep playing !`,
      icon: <SmileOutlined style={{ color: '#ed9147', fontSize: '30px' }} />,
      top: 40,
    });
  };
  
  return (
    <div className="app">
      <img src={publicUrl('/bg1.jpg')} alt="" />
      <div className="overlay"></div>
      <div className="app_body">
        <h1>Quiz Game</h1>
        {(gameOver || number === totalQuestion) && !loading && (
          <Form layout="horizontal" onFinish={hanndleStart}>
            <Form.Item label="Amount Questions" name="amount" initialValue={10}>
              <Select>
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={15}>15</Option>
                <Option value={20}>20</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category" initialValue="all">
              <Select>
                <Option value="all">All</Option>
                <Option value={10}>Books</Option>
                <Option value={11}>Film</Option>
                <Option value={12}>Music</Option>
                <Option value={21}>Sports</Option>
                <Option value={23}>History</Option>
                <Option value={24}>Politics</Option>
                <Option value={25}>Art</Option>
                <Option value={27}>Animals</Option>
                <Option value={28}>Vehicles</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Difficulty" name="difficulty" initialValue={Difficulty.EASY}>
              <Select>
                <Option value={Difficulty.EASY}>EASY</Option>
                <Option value={Difficulty.MEDIUM}>MEDIUM</Option>
                <Option value={Difficulty.HARD}>HARD</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Start
              </Button>
            </Form.Item>
          </Form>
        )}
        {!gameOver && (
          <p className="score">
            Score : <span>{score}</span>
          </p>
        )}
        {loading && <p className="loading">Loading Questions...</p>}
        {loading && (
          <div className="loading_ske">
            <Skeleton.Input active size="default" />
            <Skeleton.Input active size="default" />
            <Skeleton.Input active size="default" />
            <Skeleton.Input active size="default" />
          </div>
        )}
        {!loading && !gameOver && (
          <QuizCard
            questionCurrent={number + 1}
            totalQuestions={totalQuestion}
            question={quizList[number].question}
            difficulty={quizList[number].difficulty}
            category={quizList[number].category}
            answers={quizList[number].answers}
            answerCorrect={quizList[number].correct_answer}
            answered={answered}
            userAnswer={userAnswer}
          />
        )}
        {!gameOver && !loading && quizList.length > 0 && number + 1 !== totalQuestion && answered && (
          <button className="next" onClick={() => dispatch(nextQuestion(number + 1))}>
            Next
          </button>
        )}
        {!gameOver && !loading && quizList.length > 0 && number + 1 === totalQuestion && answered && (
          <button
            className="next"
            onClick={() => {
              dispatch(nextQuestion(number + 1));
              notificationScore();
            }}
          >
            End
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

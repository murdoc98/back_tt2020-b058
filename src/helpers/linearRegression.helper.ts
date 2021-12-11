import * as tf from '@tensorflow/tfjs-node';

export default async(x_vals: Array<number>, y_vals: Array<number>) => {
  // Creating all enviroment for training
  let m = tf.variable(tf.scalar(Math.random()));
  let b = tf.variable(tf.scalar(Math.random()));
  // y = mx + b
  const learningRate = 0.5;
  const optimizer = tf.train.sgd(learningRate);
  tf.tidy(() => {
    if (x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(() => loss(predict(x_vals, m, b), ys));
    }
  });
  const lineX = [1, 0];
  const ys = tf.tidy(() => predict(lineX, m, b));
  let lineY = await ys.data();
  ys.dispose();
  console.log(tf.memory().numTensors);
  return 1;
}

const loss = (pred: tf.Tensor<tf.Rank>, labels: tf.Tensor1D) => pred.sub(labels).square().mean();

const predict = (x, m, b) => {
  const xs = tf.tensor1d(x);
  const ys = xs.mul(m).add(b);
  return ys;
}
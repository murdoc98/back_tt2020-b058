import * as tf from '@tensorflow/tfjs-node';

export default async(x_vals: Array<number>, y_vals: Array<number>) => {
  // Creating all enviroment for training
  let m = tf.variable(tf.scalar(Math.random()));
  let b = tf.variable(tf.scalar(Math.random()));
  // y = mx + b
  let lineY;
  for(let i = 0; i <= 50; i++) {
    m.print();
    b.print();
    tf.tidy(() => {
      if (x_vals.length > 0) {
        const ys = tf.tensor1d(y_vals);
        optimizer.minimize(() => loss(predict(x_vals, m, b), ys));
      }
    });
    const lineX = [Date.now() + ( 3600 * 1000 * 24)];
    const ys = tf.tidy(() => predict(lineX, m, b));
    lineY = await ys.data();
    ys.dispose();
  }
  return lineY;
}

const optimizer = tf.train.sgd(0.5);
const loss = (pred: tf.Tensor<tf.Rank>, labels: tf.Tensor1D) => pred.sub(labels).square().mean() as tf.Scalar;

const predict = (x: Array<number>, m: tf.Scalar, b: tf.Scalar) => {
  const xs = tf.tensor1d(x);
  const ys = xs.mul(m).add(b);
  return ys;
}
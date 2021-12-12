import * as tf from '@tensorflow/tfjs-node';

export default async(x_vals: Array<number>, y_vals: Array<number>) => {
  const xNew = x_vals.map((x) => (Math.ceil((x/1000/60/60) - 455300))/100);
  const yNew = y_vals.map((y) => y/100);
  // Creating all enviroment for training
  let m = tf.variable(tf.scalar(Math.random()));
  let b = tf.variable(tf.scalar(Math.random()));
  // y = mx + b
  let lineY;
  for(let i = 0; i <= 200; i++) {
    tf.tidy(() => {
      if (xNew.length > 0) {
        const ys = tf.tensor1d(yNew);
        optimizer.minimize(() => loss(predict(xNew, m, b), ys));
      }
    });
    const lineX = [Math.ceil((Date.now()/1000/60/60) - 455300)/100];
    const ys = tf.tidy(() => predict(lineX, m, b));
    lineY = await ys.data();
    ys.dispose();
  }
  return lineY;
}

const optimizer = tf.train.sgd(0.3);
const loss = (pred: tf.Tensor<tf.Rank>, labels: tf.Tensor1D) => pred.sub(labels).square().mean() as tf.Scalar;

const predict = (x: Array<number>, m: tf.Scalar, b: tf.Scalar) => {
  const xs = tf.tensor1d(x);
  const ys = xs.mul(m).add(b);
  return ys;
}
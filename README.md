# Synaptic 

## Contents

### [Overview](#overview-1)
### [System Installation](#system-installation)
### [Steps for Transpilation to ES5](#transpilation-to-es5)
### [Usage](#usage-1)
### [Assets](#assets-1)

## Overview

Neural Networks can be implemented using the Synaptic library to run on the ClearBlade Platform for classification purposes. Synaptic is a javascript neural network library for node.js and the browser, its generalized algorithm is architecture-free, so you can build and train basically any type of first order or even [second order neural network architectures](https://en.wikipedia.org/wiki/Recurrent_neural_network#Second_Order_Recurrent_Neural_Network). 

This library includes a few built-in architectures like [multilayer perceptrons](https://en.wikipedia.org/wiki/Multilayer_perceptron), [multilayer long-short term memory](https://en.wikipedia.org/wiki/Long_short-term_memory) networks (LSTM), [liquid state machines](https://en.wikipedia.org/wiki/Liquid_state_machine) or [Hopfield](https://en.wikipedia.org/wiki/Hopfield_network) networks, and a trainer capable of training any given network.

If you have no prior knowledge about Neural Networks, you should start by reading this [guide](https://github.com/cazala/synaptic/wiki/Neural-Networks-101).

If you want a practical example on how to feed data to a neural network, then take a look at this [article](https://github.com/cazala/synaptic/wiki/Normalization-101).

[Neural Networks of JavaScript](https://webkid.io/blog/neural-networks-in-javascript/)

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## System Installation

1. Open the ClearBlade Platform and enter your login credentials
```
https://platform.clearblade.com/
```
2. Click on **Add System** -> **Advanced** and copy the link of this repository in the box.
```
https://github.com/ClearBlade/brain-js
```
3. Click **Create**
4. You can now access this system in the platform.

## Transpilation to ES5

Follow these [steps](https://github.com/ClearBlade/Machine-Learning-Node-Libraries/blob/master/README.md#steps-for-transpilation-to-es5-1) for transpilation of any NPM package to ES5 so that the NPM package can be imported as a library in the clearblade code engine.

## Usage

- This IPM package consists of a Neural Networks Library that can be imported in the ClearBlade Platform in order to train and test machine learning models on the platform.

- This library currently supports implementation of 8 types of neural networks which are
  - brain.NeuralNetwork - Feedforward Neural Network with backpropagation
  - brain.NeuralNetworkGPU - Feedforward Neural Network with backpropagation, GPU version
  - brain.recurrent.RNNTimeStep - Time Step Recurrent Neural Network or "RNN"
  - brain.recurrent.LSTMTimeStep - Time Step Long Short Term Memory Neural Network or "LSTM"
  - brain.recurrent.GRUTimeStep - Time Step Gated Recurrent Unit or "GRU"
  - brain.recurrent.RNN - Recurrent Neural Network or "RNN"
  - brain.recurrent.LSTM - Long Short Term Memory Neural Network or "LSTM"
  - brain.recurrent.GRU - Gated Recurrent Unit or "GRU"
  - [Why different types of Neural Networks?](https://github.com/BrainJS/brain.js#why-different-neural-network-types)

- A brief tutorial about how to design neural networks with the Brain-JS library can be found [here](https://scrimba.com/g/gneuralnetworks)

- The following code snippet loads the Brain JS library and allows your code to access functionality of the library APIs via the **brain** variable.

``` javascript
  var brain = BrainJS();
```

- Once we define the **brain** variable, we configure the neural networks by providing different hyperparameters. The hyperparameters can be adjusted according to the user to get the best classification accuracy. There are different hyperparameters that can be provided. 
  - In this example, we have provided two hyperparameters viz. **activation** which introduces non-linearity. There are currently four supported activation functions: sigmoid (default), relu, leaky-relu, tanh. 
  -  The second hyperparameter is **hiddenLayers** which defines the number of neurons in the hidden layers. In this case, there are 2 hidden layers and there are 64 neurons in the first layer and 128 neurons in the second layer.

``` javascript
  var net = new brain.NeuralNetwork({
    activation: "relu",
    hiddenLayers: [64, 128]
  });
```

- More options for hyperparameters can be found [here](https://github.com/BrainJS/brain.js#examples). 
 
- After configuring the neural network, the training data can be set up as shown below. This data includes Readings recorded from 3 sensors (Power, Temperature and Accelerometer) inside a machine. The training labels are also defined which give information about whether a maintenance was required for a given set of sensor values. ( 0 - Maintenance Not Required; 1 - Maintenance Required )

``` javascript
  var trainingData = [
    { input : { power: 1350, temperature: 73.4, accelerometer: 0.0683 }, output: { not_required : 0 } },
    { input : { power: 1350, temperature: 73.4, accelerometer: 0.0685 }, output: { not_required : 0 } }, 
    { input : { power: 1532, temperature: 83.1, accelerometer: 0.5272 }, output: { not_required : 0 } },
    { input : { power: 1710, temperature: 77.3, accelerometer: 1.7210 }, output: { required : 1 } }, 
    { input : { power: 1200, temperature: 76.6, accelerometer: 0.0688 }, output: { not_required : 0 } },
    { input : { power: 1820, temperature: 82.1, accelerometer: 0.4333 }, output: { required : 1 } },
    { input : { power: 1421, temperature: 75.4, accelerometer:0.0695 }, output: { not_required : 0 } },
    { input : { power: 1800, temperature: 95.1, accelerometer: 1.9000 }, output: { required : 1 } },
    { input : { power: 1520, temperature: 82.4, accelerometer: 0.4272 }, output: { not_required : 0 } },
    { input : { power: 1740, temperature: 95.0, accelerometer: 1.7150 }, output: { required : 1 } },
  ]
```

- Using this training data, train the classifier as follows. Different training options that can be given are prrovided [here](https://github.com/BrainJS/brain.js#training-options)

``` javascript
  net.train( 
    trainingData,     
    {
      iterations: 100,
      learningRate: 0.1,
      log: true,
      logPeriod: 10
    }
  );
```

- The output after training of the model:

```
{
  error: 0.0039139985510105032,  // training error
  iterations: 406                // training iterations
}
```

- Once the classifer is trained, predict for a given set of sensor values, if a maintenance is required or not.
``` javascript
  var prediction = net.run({ power: 1780, temperature: 95.5, accelerometer: 1.8120 });
```

- The implementation of this library is done in the [smoke test](https://github.com/ClearBlade/synaptic/blob/master/code/services/SynapticSmokeTest/SynapticSmokeTest.js) and you can refer to the [**Official Documentation**](https://github.com/cazala/synaptic) of that library to explore more options that you can use.  

## Assets

### Libraries 

| Library  | Description  | Official Documentation |   
|---|---|---|
| ``` Synaptic ```  | A Library to Implement Neural Networks | https://github.com/cazala/synaptic  | 

### Code Services

``` SynapticSmokeTest ``` : A code service to show working of Synaptic Library.

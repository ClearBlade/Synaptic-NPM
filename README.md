# Synaptic 

## Contents

### [Overview](#overview-1)
### [System Installation](#system-installation)
### [Usage](#usage-1)
### [Assets](#assets-1)
### [Advanced](#advanced-1)

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

## Usage

- This IPM package consists of a Neural Networks Library that can be imported in the ClearBlade Platform in order to train and test machine learning models on the platform.

- Before defining the neural network model, we first define the training data. This data includes Readings recorded from 3 sensors (Power, Temperature and Accelerometer) inside a machine. The training labels are also defined which give information about whether a maintenance was required for a given set of sensor values. ( 0 - Maintenance Not Required; 1 - Maintenance Required )

``` javascript
   var trainingData = [
    { input: [1350, 73.4, 0.0683], output: [0] }, 
    { input: [1350, 73.4, 0.0685], output: [0] }, 
    { input: [1532, 83.1, 0.5272], output: [0] }, 
    { input: [1710, 77.3, 1.7210], output: [1] },
    { input: [1200, 76.6, 0.0688], output: [0] },
    { input: [1820, 82.1, 0.4333], output: [1] },
    { input: [1421, 75.4, 0.0695], output: [0] },
    { input: [1800, 95.1, 1.9000], output: [1] },
    { input: [1520, 82.4, 0.4272], output: [0] },
    { input: [1740, 95.0, 1.7150], output: [1] },
  ];
```

- After defining the data, load the Synaptic library. The following snippet loads the library and allows your code to access functionality of the library APIs via the **synaptic** variable.

``` javascript
  var synaptic = getSynaptic();
```

- Once we define the **synaptic** variable, we define the Layer, Network and Trainer objects which will be essentially used for defining the layers, configuring the neural network and training the model.

``` javascript
  var Layer = synaptic.Layer;
  var Network = synaptic.Network;
  var Trainer = synaptic.Trainer;
```

- Define the number of neurons and the number of layers to be used in the neural network.

``` javascript
  var input_neurons = 3;
  var hidden_neurons = 64;
  var output_neurons = 1;
  
  // Define Layers
  var inputLayer = new Layer(input_neurons);
  var hiddenLayer = new Layer(hidden_neurons);
  var outputLayer = new Layer(output_neurons); 
```

- Connect the layers with each other.

``` javascript
  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);
```
 
- Define a neural network. 

``` javascript
   var myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });
```

- Define a new trainer and start training the model. Different options for training the model are given [here](https://github.com/cazala/synaptic/wiki/Trainer#train)

``` javascript
   var myTrainer = new Trainer(myNetwork);
   
   myTrainer.train(trainingData, {
    rate: 0.01,
    iterations: 2000,
    error: 0.1,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
  });
```

- Once the classifer is trained, predict for a given set of sensor values, if a maintenance is required or not.
``` javascript
  var prediction = myNetwork.activate([1780, 95.5, 1.8120])
```

- The implementation of this library is done in the [smoke test](https://github.com/ClearBlade/synaptic/blob/master/code/services/SynapticSmokeTest/SynapticSmokeTest.js) and you can refer to the [**Official Documentation**](http://caza.la/synaptic/#/) of that library to explore more options that you can use.  

## Assets

### Libraries 

| Library  | Description  | Official Documentation |   
|---|---|---|
| ``` Synaptic ```  | A Library to Implement Neural Networks | https://github.com/cazala/synaptic  | 

### Code Services

``` SynapticSmokeTest ``` : A code service to show working of Synaptic Library.

## Advanced

### Transpilation to ES5

Follow these [steps](https://github.com/ClearBlade/Machine-Learning-Node-Libraries/blob/master/README.md#steps-for-transpilation-to-es5-1) for transpilation of any NPM package to ES5 so that the NPM package can be imported as a library in the clearblade code engine.

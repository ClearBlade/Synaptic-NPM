function SynapticSmokeTest(req, resp) {
  
  var synaptic = getSynaptic();

  var Layer = synaptic.Layer;
  var Network = synaptic.Network;
  var Trainer = synaptic.Trainer;
  
  var input_neurons = 3;
  var hidden_neurons = 64;
  var output_neurons = 1;
  
  // Define Layers
  var inputLayer = new Layer(input_neurons);
  var hiddenLayer = new Layer(hidden_neurons);
  var outputLayer = new Layer(output_neurons); 
  
  // Connecting the Layers
  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer); 
  
  // Create a Neural Net
  var myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });

  var myTrainer = new Trainer(myNetwork);

  // Training Data includes Readings recorded from 3 sensors (Power, Temperature and Accelerometer) inside a machine. Using these values, 
  // we have to predict whether a machine requires maintenance
  // 0 - Maintenance Not Required
  // 1 - Maintenance Required

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
  
  // Train Network
  myTrainer.train(trainingData, {
    rate: 0.01,
    iterations: 2000,
    error: 0.1,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
  }); 
  
  // Predict if maintenance is required for sensor values - { power: 1780, temperature: 95.5, accelerometer: 1.8120 }
  var prediction = myNetwork.activate([1780, 95.5, 1.8120])
  if (prediction > 0.5){
    log("Maintenance Required ");
  } else {
    log("Maintenance Not Required ");
  }

  resp.success('Success');
  }

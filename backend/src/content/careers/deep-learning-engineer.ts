import type { CareerDef } from '../framework.js'

export const deepLearningEngineer: CareerDef = {
  slug: 'deep-learning-engineer',
  name: 'Deep Learning Engineer',
  category: 'AI & Data',
  order: 16,
  description:
    'Designs neural architectures — CNNs, RNNs, transformers — and trains them efficiently on GPUs with PyTorch/TensorFlow.',
  difficulty: 'Advanced',
  pathSummary:
    'Python & neural network math → CNNs for vision → RNNs & sequence modeling → transformer architectures → GPU-accelerated training → transfer learning & fine-tuning → distributed training & production deployment → model optimization & research practices.',
  mainSkills: [
    'PyTorch',
    'TensorFlow',
    'CNN Architecture Design',
    'Sequence Modeling (RNN/LSTM)',
    'Transformer Architecture',
    'GPU Computing & CUDA',
    'Transfer Learning & Fine-Tuning',
    'Model Optimization & Quantization'
  ],
  sourcePlatforms: [
    'PyTorch',
    'TensorFlow',
    'NVIDIA Developer',
    'Hugging Face',
    'Python'
  ],
  companyName: 'DeepForge Labs',
  roleTitle: 'Deep Learning Engineer',

  chapters: [
    {
      slug: 'dl-foundations',
      stage: 'Beginner',
      title: 'Deep Learning & Neural Network Foundations',
      description: 'The mathematical building blocks and introductory PyTorch skills every deep learning engineer must master.',
      topics: [
        {
          slug: 'neural-network-fundamentals',
          title: 'Neural Network Fundamentals',
          minutes: 30,
          objectives: [
            'Describe the structure of a feedforward neural network: layers, weights, biases and activation functions',
            'Explain forward propagation and backpropagation at a conceptual level',
            'Identify the role of loss functions and gradient descent in training'
          ],
          sections: [
            { heading: 'Anatomy of a neural network', body: 'A neural network is a computational graph of interconnected nodes organized into layers. The input layer receives raw features, hidden layers transform them through learned weight matrices and activation functions, and the output layer produces predictions. Each connection carries a weight that is adjusted during training, and each neuron adds a bias before applying a non-linear activation like ReLU, sigmoid or tanh.' },
            { heading: 'Forward and backward propagation', body: 'During forward propagation, input data flows through the network layer by layer, producing an output and a loss value against the ground truth. Backpropagation computes the gradient of the loss with respect to every weight by applying the chain rule from the output layer back to the input. These gradients indicate how each weight should change to reduce the loss.' },
            { heading: 'Optimization and loss functions', body: 'Gradient descent updates weights by stepping in the direction opposite to the gradient, scaled by a learning rate. Common loss functions include cross-entropy for classification and mean squared error for regression. Variants like stochastic gradient descent (SGD), Adam and AdamW adjust the step size per-parameter using momentum and adaptive learning rates to converge faster and more reliably.' }
          ],
          links: [
            { title: 'Neural Networks and Deep Learning', url: 'http://neuralnetworksanddeeplearning.com/', sourceName: 'Michael Nielsen', resourceType: 'course', relationship: 'Free book with visual explanations of forward and backward propagation, loss functions and gradient descent.' },
            { title: 'PyTorch 60 Minute Blitz', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Official hands-on introduction to building neural networks in PyTorch.' },
            { title: 'Stanford CS231n — Neural Networks', url: 'https://cs231n.github.io/neural-networks-1/', sourceName: 'PyTorch', resourceType: 'course', relationship: 'Foundational lecture notes on neural network architecture and training mechanics.' }
          ],
          quiz: {
            prompt: 'What does backpropagation compute for each weight in the network?',
            options: [
              'The final output value of the network',
              'The gradient of the loss with respect to that weight, indicating how to adjust it',
              'The learning rate for the next training epoch',
              'The activation value of the neuron connected to that weight'
            ],
            answerIndex: 1,
            explanation: 'Backpropagation applies the chain rule from the loss backwards through the network, computing the partial derivative of the loss with respect to each weight so the optimizer knows which direction and how much to update.'
          }
        },
        {
          slug: 'python-numpy-for-dl',
          title: 'Python & NumPy for Deep Learning',
          minutes: 30,
          objectives: [
            'Manipulate multi-dimensional arrays with NumPy for tensor operations',
            'Write vectorized operations that replace slow Python loops',
            'Load, preprocess and batch data for deep learning training loops'
          ],
          sections: [
            { heading: 'Tensors as the universal data structure', body: 'Deep learning frameworks represent all data — images, text, audio — as tensors, which are multi-dimensional arrays. NumPy ndarray is the foundation: PyTorch tensors and TensorFlow tensors interoperate directly with NumPy. Understanding array shapes, broadcasting and axis conventions is essential for debugging shape mismatches, the most common error in deep learning code.' },
            { heading: 'Vectorized operations', body: 'Python loops are orders of magnitude slower than optimized C/Fortran routines underlying NumPy. Replace explicit loops over elements with vectorized operations: element-wise multiplication, matrix multiplication with @ or np.dot, and broadcasting for operations between arrays of different shapes. Vectorization is the single most impactful performance habit in deep learning.' },
            { heading: 'Data loading and batching', body: 'Real training pipelines must load raw data, apply transformations — resizing, normalization, augmentation — and deliver it in mini-batches to the GPU. PyTorch DataLoader and Dataset classes handle this with configurable batch sizes, shuffling and parallel workers. NumPy handles the preprocessing steps before tensors are constructed.' }
          ],
          links: [
            { title: 'NumPy Quickstart Tutorial', url: 'https://numpy.org/doc/stable/user/quickstart.html', sourceName: 'Python', resourceType: 'tutorial', relationship: 'Essential NumPy operations: array creation, indexing, broadcasting and linear algebra.' },
            { title: 'PyTorch Tensor Tutorial', url: 'https://pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Converting between NumPy and PyTorch tensors and performing tensor operations.' },
            { title: 'PyTorch Data Loading Tutorial', url: 'https://pytorch.org/tutorials/beginner/basics/data_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Using Dataset and DataLoader classes for efficient batched data pipelines.' }
          ],
          quiz: {
            prompt: 'Why is vectorized NumPy code faster than an equivalent Python for-loop?',
            options: [
              'NumPy uses a different Python interpreter',
              'NumPy operations execute optimized C routines that process entire arrays without per-element Python overhead',
              'NumPy automatically parallelizes across all CPU cores',
              'Python for-loops cannot handle floating-point arithmetic'
            ],
            answerIndex: 1,
            explanation: 'NumPy delegates array operations to compiled C/Fortran implementations that process contiguous memory in bulk, eliminating the Python interpreter overhead of each loop iteration.'
          }
        },
        {
          slug: 'intro-to-pytorch',
          title: 'Introduction to PyTorch',
          minutes: 25,
          objectives: [
            'Build and train a simple neural network using nn.Module and the PyTorch training loop',
            'Use autograd to compute gradients automatically',
            'Define custom datasets and training loops with loss tracking'
          ],
          sections: [
            { heading: 'PyTorch as the deep learning framework of choice', body: 'PyTorch uses eager execution — operations run immediately and produce concrete values — making debugging as straightforward as normal Python. Its autograd engine tracks operations on tensors and computes gradients on demand with .backward(). The nn.Module class provides a clean interface for defining layers, forward passes and parameter groups.' },
            { heading: 'Building a model with nn.Module', body: 'Subclass nn.Module, define your layers in __init__ and specify the forward pass in the forward method. PyTorch manages parameter registration, GPU transfer with .to(device), and gradient zeroing with optimizer.zero_grad(). This pattern scales from a single linear layer to complex architectures with skip connections and dynamic computation graphs.' },
            { heading: 'The PyTorch training loop', body: 'A standard training loop iterates over batches: forward pass to get predictions, compute the loss, call loss.backward() to populate gradients, then optimizer.step() to update weights. Between batches, zero the gradients. Track loss and accuracy metrics each epoch. This explicit loop gives you full control over the training process, unlike higher-level wrappers that obscure the mechanics.' }
          ],
          links: [
            { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Comprehensive official tutorials covering every aspect of PyTorch development.' },
            { title: 'PyTorch nn.Module Documentation', url: 'https://pytorch.org/docs/stable/nn.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Reference for all built-in layers, loss functions and module utilities.' },
            { title: 'Deep Learning with PyTorch (Free Book)', url: 'https://pytorch.org/assets/deep-learning/Deep-Learning-with-PyTorch.pdf', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'Official free book covering PyTorch fundamentals through production deployment.' }
          ],
          quiz: {
            prompt: 'What is the correct order of operations in a single PyTorch training step?',
            options: [
              'Zero gradients → Forward pass → Compute loss → Backward pass → Update weights',
              'Forward pass → Zero gradients → Compute loss → Backward pass → Update weights',
              'Compute loss → Forward pass → Backward pass → Update weights → Zero gradients',
              'Forward pass → Compute loss → Backward pass → Zero gradients → Update weights'
            ],
            answerIndex: 3,
            explanation: 'You run the forward pass, compute loss, call backward to get gradients, zero the optimizer gradients (or use a fresh optimizer), then step to update. The key is that gradients accumulate by default, so zeroing must happen before the next backward call.'
          }
        }
      ]
    },
    {
      slug: 'core-architectures',
      stage: 'Foundation',
      title: 'Core Deep Learning Architectures',
      description: 'The three foundational architecture families — CNNs, RNNs and transformers — that power virtually all modern deep learning applications.',
      topics: [
        {
          slug: 'convolutional-neural-networks',
          title: 'Convolutional Neural Networks (CNNs)',
          minutes: 30,
          objectives: [
            'Explain how convolutional layers extract spatial features from images',
            'Describe the role of pooling, stride and receptive fields in CNN design',
            'Implement a CNN classifier for image recognition using PyTorch'
          ],
          sections: [
            { heading: 'How convolutions work', body: 'A convolutional layer slides small learnable filters (e.g., 3×3) across the input, computing dot products at each position to produce a feature map. Early layers detect edges and textures; deeper layers combine them into shapes and objects. This weight-sharing mechanism means the same filter is applied everywhere, drastically reducing parameters compared to fully connected layers while preserving spatial structure.' },
            { heading: 'Pooling, stride and receptive fields', body: 'Max pooling reduces spatial dimensions by taking the maximum value in each window, providing translation invariance and reducing computation. Stride controls how far the filter moves at each step — a stride of 2 halves the spatial resolution. Receptive field is the region of the original input that influences a single output neuron; deeper layers have larger receptive fields, enabling them to capture larger patterns.' },
            { heading: 'Classic CNN architectures', body: 'LeNet-5 introduced the convolution-pooling-fully connected pattern. AlexNet proved deep CNNs could win ImageNet. VGG showed that stacking 3×3 convolutions is powerful. ResNet introduced skip connections enabling training of networks with hundreds of layers. EfficientNet uses compound scaling to balance depth, width and resolution. Understanding these milestones reveals the design principles behind modern vision models.' }
          ],
          links: [
            { title: 'Stanford CS231n — Convolutional Neural Networks', url: 'https://cs231n.github.io/convolutional-networks/', sourceName: 'PyTorch', resourceType: 'course', relationship: 'Detailed mathematical treatment of convolution operations, pooling and architecture design.' },
            { title: 'PyTorch Vision Tutorial', url: 'https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Build and train a CNN classifier on CIFAR-10 in PyTorch.' },
            { title: 'Hugging Face — Image Classification with ViT', url: 'https://huggingface.co/docs/transformers/tasks/image_classification', sourceName: 'Hugging Face', resourceType: 'tutorial', relationship: 'Modern approach using Vision Transformers alongside traditional CNNs.' }
          ],
          quiz: {
            prompt: 'Why do CNNs use weight sharing (the same filter applied across the entire input)?',
            options: [
              'It makes training faster by reducing the number of GPU operations',
              'It reduces the total number of parameters and enables the network to detect the same pattern regardless of its position in the image',
              'It ensures every pixel is processed exactly once',
              'It is required by the hardware to use SIMD instructions'
            ],
            answerIndex: 1,
            explanation: 'Weight sharing means one filter produces a feature map across all spatial locations. This drastically reduces parameters compared to a fully connected approach and encodes the prior that features like edges can appear anywhere in the image.'
          }
        },
        {
          slug: 'rnns-and-lstms',
          title: 'Recurrent Neural Networks & LSTMs',
          minutes: 30,
          objectives: [
            'Explain how RNNs process sequential data by maintaining hidden state',
            'Describe the vanishing gradient problem and how LSTMs and GRUs address it',
            'Implement a sequence-to-sequence model for text or time series tasks'
          ],
          sections: [
            { heading: 'How RNNs process sequences', body: 'A recurrent neural network processes one element of a sequence at each time step, maintaining a hidden state vector that acts as a memory of all elements seen so far. At each step, the hidden state is updated by combining the new input with the previous hidden state through learned weight matrices. This recurrent structure lets the network model temporal dependencies of arbitrary length.' },
            { heading: 'The vanishing gradient problem', body: 'During backpropagation through time, gradients are multiplied by the same weight matrices at each time step. When these multiplications are repeated over many steps, gradients either shrink exponentially toward zero (vanishing) or grow uncontrollably (exploding). Vanishing gradients prevent the network from learning long-range dependencies — the RNN cannot connect a decision at the end of a long sequence to information at the beginning.' },
            { heading: 'LSTM and GRU solutions', body: 'Long Short-Term Memory (LSTM) networks solve vanishing gradients with a separate cell state that flows through time with only additive updates via gating mechanisms. The forget gate decides what to discard, the input gate decides what to store, and the output gate decides what to expose. GRU is a simplified variant that merges the forget and input gates into a single update gate, achieving comparable performance with fewer parameters.' }
          ],
          links: [
            { title: 'Understanding LSTM Networks — Colah\'s Blog', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/', sourceName: 'PyTorch', resourceType: 'article', relationship: 'The classic visual explanation of LSTM gates and information flow.' },
            { title: 'PyTorch RNN Tutorial', url: 'https://pytorch.org/tutorials/intermediate/char_rnn_classification_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Build a character-level RNN classifier in PyTorch from scratch.' },
            { title: 'Hugging Face — Text Generation', url: 'https://huggingface.co/docs/transformers/generation_strategies', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Modern generation strategies that evolved from RNN sequence-to-sequence models.' }
          ],
          quiz: {
            prompt: 'What is the primary purpose of the forget gate in an LSTM cell?',
            options: [
              'To control the learning rate during training',
              'To decide which information from the previous cell state should be discarded',
              'To prevent gradients from exploding during backpropagation',
              'To initialize the hidden state with random values'
            ],
            answerIndex: 1,
            explanation: 'The forget gate computes a value between 0 and 1 for each element of the cell state, where 0 means completely forget and 1 means completely keep. This allows the LSTM to selectively discard outdated or irrelevant information from its memory.'
          }
        },
        {
          slug: 'transformer-architecture',
          title: 'The Transformer Architecture',
          minutes: 30,
          objectives: [
            'Explain self-attention and multi-head attention as the core mechanism of transformers',
            'Describe positional encoding and why transformers need it',
            'Differentiate encoder-only, decoder-only and encoder-decoder transformer variants'
          ],
          sections: [
            { heading: 'Self-attention mechanism', body: 'Self-attention computes a weighted combination of all positions in a sequence for each position. Each token produces a query, key and value vector. The dot product of a token\'s query with every other token\'s key produces an attention score, which is normalized with softmax and used to weight the value vectors. This lets every token attend to every other token in O(1) layers rather than the O(n) sequential steps required by RNNs.' },
            { heading: 'Multi-head attention and positional encoding', body: 'Multi-head attention runs several attention operations in parallel with different learned projections, allowing the model to attend to different types of relationships simultaneously — syntactic structure in one head, semantic similarity in another. Since self-attention is permutation-invariant, positional encodings (sinusoidal or learned) are added to input embeddings to inject information about token order.' },
            { heading: 'Transformer variants', body: 'Encoder-only models like BERT use bidirectional attention and excel at understanding tasks — classification, NER, sentiment analysis. Decoder-only models like GPT use causal (masked) attention and are trained to predict the next token, making them powerful generative models. Encoder-decoder models like T5 and the original Transformer use both: the encoder processes the input and the decoder generates the output conditioned on the encoder\'s representations.' }
          ],
          links: [
            { title: 'Attention Is All You Need (Original Paper)', url: 'https://arxiv.org/abs/1706.03762', sourceName: 'PyTorch', resourceType: 'article', relationship: 'The seminal paper introducing the transformer architecture.' },
            { title: 'The Illustrated Transformer — Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', sourceName: 'PyTorch', resourceType: 'article', relationship: 'The most accessible visual walkthrough of how transformers work.' },
            { title: 'Hugging Face Transformers Course', url: 'https://huggingface.co/learn/transformers-course', sourceName: 'Hugging Face', resourceType: 'course', relationship: 'Official course on using and understanding transformer models.' }
          ],
          quiz: {
            prompt: 'Why do transformers require positional encoding while RNNs do not?',
            options: [
              'RNNs use larger hidden states that store position information',
              'Self-attention processes all positions simultaneously and is inherently order-agnostic, so positional information must be injected explicitly',
              'Transformers operate on images where position does not matter',
              'RNNs use convolution which is inherently position-aware'
            ],
            answerIndex: 1,
            explanation: 'Self-attention computes interactions between all pairs of tokens regardless of their order. Without positional encoding, the model cannot distinguish "cat chases dog" from "dog chases cat". RNNs process tokens sequentially, so order is implicitly encoded in the computation order.'
          }
        }
      ]
    },
    {
      slug: 'training-optimization',
      stage: 'Intermediate',
      title: 'Training & Optimization at Scale',
      description: 'GPU-accelerated training, learning rate scheduling, regularization and transfer learning techniques that make deep learning practical.',
      topics: [
        {
          slug: 'gpu-training-cuda',
          title: 'GPU Computing & CUDA Fundamentals',
          minutes: 30,
          objectives: [
            'Explain the GPU architecture and why it accelerates deep learning workloads',
            'Move tensors between CPU and GPU and run model training on CUDA devices',
            'Measure GPU utilization and identify common memory and compute bottlenecks'
          ],
          sections: [
            { heading: 'Why GPUs accelerate deep learning', body: 'GPUs contain thousands of small, specialized cores designed for parallel arithmetic operations — exactly the matrix multiplications and element-wise operations that dominate neural network training. A modern NVIDIA GPU can perform trillions of floating-point operations per second (TFLOPS) on these operations, while a CPU is optimized for sequential logic and control flow. Training a model that takes weeks on CPU can finish in hours on a GPU.' },
            { heading: 'CUDA and PyTorch device management', body: 'CUDA is NVIDIA\'s parallel computing platform. PyTorch abstracts CUDA details: tensors are moved to GPU with .to("cuda") or .to(device), and all subsequent operations run on GPU automatically. torch.cuda.is_available() checks for GPU availability, torch.cuda.device_count() reports the number of GPUs, and torch.cuda.memory_allocated() tracks VRAM usage. Always verify your tensor and model live on the same device to avoid runtime errors.' },
            { heading: 'Profiling and bottleneck identification', body: 'GPU training bottlenecks fall into three categories: data loading (CPU too slow to feed the GPU), compute (model too large or operations inefficient) and memory (batch size too large for VRAM). Use torch.profiler to measure time spent in each operation, nvidia-smi to monitor GPU utilization and memory, and mixed precision training (torch.amp) to reduce memory and increase throughput by using FP16 where precision loss is acceptable.' }
          ],
          links: [
            { title: 'NVIDIA Deep Learning Fundamentals', url: 'https://developer.nvidia.com/deep-learning-training', sourceName: 'NVIDIA Developer', resourceType: 'course', relationship: 'Official NVIDIA course on GPU-accelerated deep learning concepts and tools.' },
            { title: 'PyTorch CUDA Semantics', url: 'https://pytorch.org/docs/stable/notes/cuda.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Official guide to CUDA tensors, device management and memory handling.' },
            { title: 'NVIDIA Deep Learning Performance Guide', url: 'https://docs.nvidia.com/deeplearning/performance/dl-performance-matrix-multiplication/index.html', sourceName: 'NVIDIA Developer', resourceType: 'guide', relationship: 'Detailed guide to optimizing matrix multiplication performance on NVIDIA GPUs.' }
          ],
          quiz: {
            prompt: 'What is the primary benefit of using mixed precision training (FP16)?',
            options: [
              'It makes the model more accurate by using lower precision numbers',
              'It reduces memory usage and increases throughput by performing some operations in half-precision while maintaining training quality with loss scaling',
              'It allows the model to run on CPU without a GPU',
              'It eliminates the need for gradient computation'
            ],
            answerIndex: 1,
            explanation: 'FP16 uses half the memory of FP32, enabling larger batch sizes and faster computation on tensor cores. Loss scaling techniques prevent underflow in small gradients, maintaining training quality comparable to full-precision training.'
          }
        },
        {
          slug: 'learning-rate-scheduling',
          title: 'Learning Rate Scheduling & Regularization',
          minutes: 30,
          objectives: [
            'Explain why learning rate is the most important hyperparameter in deep learning',
            'Implement common scheduling strategies: cosine annealing, warmup and step decay',
            'Apply dropout, weight decay and data augmentation as regularization techniques'
          ],
          sections: [
            { heading: 'The critical role of learning rate', body: 'Learning rate controls the step size during gradient descent. Too high and training diverges — loss explodes or oscillates wildly. Too low and training converges painfully slowly or gets stuck in poor local minima. The optimal learning rate depends on the model, dataset and batch size. Learning rate finders plot loss against learning rate to identify the optimal range empirically.' },
            { heading: 'Scheduling strategies', body: 'Cosine annealing smoothly decreases the learning rate from a maximum to near zero following a cosine curve, which works well for most tasks and is the default in modern training. Warmup starts training with a very small learning rate and linearly increases it over the first few epochs, preventing early instability in large models. Step decay reduces the learning rate by a fixed factor at predetermined epochs.' },
            { heading: 'Regularization techniques', body: 'Dropout randomly zeros activations during training with a probability p, forcing the network to learn redundant representations and preventing co-adaptation of neurons. Weight decay (L2 regularization) adds a penalty proportional to the squared magnitude of weights, pushing the model toward simpler solutions. Data augmentation creates synthetic training examples through random transformations — flips, crops, color jitter — effectively increasing dataset size without collecting new data.' }
          ],
          links: [
            { title: 'PyTorch Learning Rate Schedulers', url: 'https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Official documentation for all built-in learning rate scheduler classes.' },
            { title: 'TensorFlow Learning Rate Schedules', url: 'https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/schedules', sourceName: 'TensorFlow', resourceType: 'documentation', relationship: 'TensorFlow\'s learning rate schedule API and implementation examples.' },
            { title: 'A Recipe for Training Neural Networks — Karpathy', url: 'https://karpathy.github.io/2019/04/25/recipe/', sourceName: 'PyTorch', resourceType: 'article', relationship: 'Practical tips for training neural networks including learning rate and regularization.' }
          ],
          quiz: {
            prompt: 'Why is learning rate warmup beneficial when training large transformer models?',
            options: [
              'It increases the total number of training epochs',
              'It prevents large, unstable gradient updates early in training when the model\'s weights are still randomly initialized',
              'It reduces the memory required by the optimizer',
              'It eliminates the need for weight decay'
            ],
            answerIndex: 1,
            explanation: 'Early in training, gradients can be large and erratic. Starting with a small learning rate and ramping up allows the optimizer to find a stable region before committing to large steps, preventing divergence in large models.'
          }
        },
        {
          slug: 'transfer-learning-finetuning',
          title: 'Transfer Learning & Fine-Tuning',
          minutes: 25,
          objectives: [
            'Explain the intuition behind transfer learning and when it outperforms training from scratch',
            'Fine-tune a pre-trained model on a custom dataset using PyTorch and Hugging Face',
            'Choose between feature extraction, full fine-tuning and parameter-efficient fine-tuning strategies'
          ],
          sections: [
            { heading: 'Why transfer learning works', body: 'Models pre-trained on large datasets like ImageNet or large text corpora learn general-purpose features — edge detectors, texture patterns, grammatical structures — that transfer to new tasks. Fine-tuning adapts these pre-trained features to your specific task using your smaller dataset, often achieving better performance than training from scratch with far less data and compute.' },
            { heading: 'Fine-tuning strategies', body: 'Feature extraction freezes the pre-trained layers and only trains a new classification head, which is fast and works well when your dataset is very small. Full fine-tuning updates all parameters, which works best when you have a moderate-sized dataset and want maximum accuracy. Parameter-efficient fine-tuning (PEFT) methods like LoRA add small trainable adapter layers while keeping the base model frozen, achieving near-full-fine-tuning quality at a fraction of the compute cost.' },
            { heading: 'Hugging Face and the model hub', body: 'Hugging Face hosts hundreds of thousands of pre-trained models with a unified API through the transformers library. Loading a pre-trained model is a single function call: from_pretrained(). The Trainer class handles training loops, evaluation and checkpointing automatically. Combined with datasets library, you can go from raw data to fine-tuned model in a few dozen lines of code.' }
          ],
          links: [
            { title: 'Hugging Face Fine-Tuning Tutorial', url: 'https://huggingface.co/docs/transformers/training', sourceName: 'Hugging Face', resourceType: 'tutorial', relationship: 'Official guide to fine-tuning pre-trained models with the Trainer API.' },
            { title: 'PyTorch Transfer Learning Tutorial', url: 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Hands-on tutorial on fine-tuning pre-trained vision models in PyTorch.' },
            { title: 'Hugging Face PEFT Library', url: 'https://huggingface.co/docs/peft/index', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Parameter-efficient fine-tuning methods including LoRA and adapters.' }
          ],
          quiz: {
            prompt: 'When should you prefer parameter-efficient fine-tuning (LoRA) over full fine-tuning?',
            options: [
              'When you have unlimited compute and want maximum accuracy',
              'When you need to fine-tune a large model but have limited GPU memory and compute budget, while maintaining near-full-fine-tuning quality',
              'When your dataset has fewer than 10 examples',
              'When you are training a model from scratch'
            ],
            answerIndex: 1,
            explanation: 'LoRA adds small trainable rank-decomposition matrices to attention layers while keeping the base model frozen, reducing trainable parameters by orders of magnitude. This makes fine-tuning large models feasible on consumer GPUs with minimal quality loss.'
          }
        }
      ]
    },
    {
      slug: 'production-scaling',
      stage: 'Advanced',
      title: 'Production, Scaling & Architecture Design',
      description: 'Distributed training across multiple GPUs, model optimization for deployment, and research practices for designing novel architectures.',
      topics: [
        {
          slug: 'distributed-training',
          title: 'Distributed Training & Large-Scale Systems',
          minutes: 30,
          objectives: [
            'Explain data parallelism and model parallelism as strategies for scaling training',
            'Use PyTorch DistributedDataParallel and torchrun for multi-GPU training',
            'Identify communication bottlenecks and optimize multi-node training configurations'
          ],
          sections: [
            { heading: 'Data parallelism', body: 'Data parallelism replicates the model on each GPU, splits the training batch across GPUs, and each GPU computes gradients independently. Gradients are then synchronized across all GPUs — typically via all-reduce — before updating the model. This scales nearly linearly with the number of GPUs for models that fit in a single GPU\'s memory. PyTorch DistributedDataParallel (DDP) implements this efficiently.' },
            { heading: 'Model parallelism and pipeline parallelism', body: 'When a model is too large to fit on a single GPU, model parallelism splits the model itself across GPUs — different layers on different devices. Pipeline parallelism extends this by splitting the batch into micro-batches and pipelining them through model stages, keeping all GPUs busy. ZeRO optimization (used by DeepSpeed) partitions optimizer states, gradients and parameters across GPUs to train models that would otherwise require impractical amounts of memory.' },
            { heading: 'Multi-node communication', body: 'In multi-node setups, GPU-to-GPU communication happens over NVLink within a node and over InfiniBand or Ethernet between nodes. Network bandwidth becomes the bottleneck for gradient synchronization. Strategies to mitigate this include gradient compression, overlapping communication with computation, and careful placement of model shards to minimize cross-node traffic. torchrun handles process launching and environment setup across nodes.' }
          ],
          links: [
            { title: 'PyTorch Distributed Tutorial', url: 'https://pytorch.org/tutorials/intermediate/ddp_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Step-by-step guide to DistributedDataParallel training.' },
            { title: 'NVIDIA Deep Learning Training Documentation', url: 'https://docs.nvidia.com/deeplearning/frameworks/user-guide/', sourceName: 'NVIDIA Developer', resourceType: 'documentation', relationship: 'NVIDIA\'s comprehensive guide to distributed deep learning on GPU clusters.' },
            { title: 'PyTorch FSDP Tutorial', url: 'https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Fully Sharded Data Parallel training for scaling to very large models.' }
          ],
          quiz: {
            prompt: 'In data parallelism with 4 GPUs, what happens to gradients after each GPU computes them independently?',
            options: [
              'Each GPU uses its own gradients to update its own copy of the model independently',
              'Gradients are averaged across all GPUs via all-reduce before every GPU applies the same update',
              'Gradients are sent to the CPU which computes the average and sends it back',
              'Only the GPU with the lowest loss contributes gradients'
            ],
            answerIndex: 1,
            explanation: 'All-reduce synchronizes gradients across all GPUs so every replica receives the averaged gradient. All GPUs then apply the identical update, keeping model replicas synchronized throughout training.'
          }
        },
        {
          slug: 'model-optimization-deployment',
          title: 'Model Optimization & Deployment',
          minutes: 30,
          objectives: [
            'Apply quantization, pruning and knowledge distillation to reduce model size and latency',
            'Export trained models to ONNX or TorchScript for production inference',
            'Benchmark model performance and optimize inference pipelines for real-time serving'
          ],
          sections: [
            { heading: 'Quantization and pruning', body: 'Quantization reduces model weights from FP32 to INT8 or even INT4, cutting memory usage by 4x-8x and accelerating inference on hardware with integer arithmetic support. Post-training quantization applies this without retraining; quantization-aware training simulates low-precision during training for better accuracy. Pruning removes redundant weights — magnitude-based pruning zeroes out the smallest weights, and structured pruning removes entire neurons or channels for actual speedup.' },
            { heading: 'Knowledge distillation', body: 'Knowledge distillation trains a smaller "student" model to mimic the outputs of a larger "teacher" model. The student learns from the teacher\'s soft probability distributions (logits), which contain richer information than hard labels — they encode the teacher\'s confidence and relationships between classes. This produces compact models that approach teacher quality while being dramatically faster to run.' },
            { heading: 'Model export and serving', body: 'TorchScript traces or scripts a PyTorch model into a serialized format that runs without Python. ONNX exports a model in a framework-agnostic format compatible with TensorRT, ONNX Runtime and other inference engines. For production serving, use TorchServe, NVIDIA Triton or TensorFlow Serving to deploy models behind REST/gRPC endpoints with batching, versioning and health checks. Optimize inference latency with TensorRT graph optimization on NVIDIA GPUs.' }
          ],
          links: [
            { title: 'PyTorch Quantization Documentation', url: 'https://pytorch.org/docs/stable/quantization.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Official quantization guide covering post-training and quantization-aware approaches.' },
            { title: 'TensorFlow Model Optimization', url: 'https://www.tensorflow.org/model_optimization', sourceName: 'TensorFlow', resourceType: 'documentation', relationship: 'TensorFlow\'s model optimization toolkit including pruning and quantization.' },
            { title: 'NVIDIA TensorRT Documentation', url: 'https://docs.nvidia.com/deeplearning/tensorrt/', sourceName: 'NVIDIA Developer', resourceType: 'documentation', relationship: 'High-performance deep learning inference optimizer and runtime.' }
          ],
          quiz: {
            prompt: 'What is the primary advantage of structured pruning over unstructured pruning?',
            options: [
              'Structured pruning removes more total parameters',
              'Structured pruning removes entire neurons or channels, resulting in actual wall-clock speedup on standard hardware',
              'Structured pruning does not require retraining',
              'Structured pruning achieves higher model accuracy'
            ],
            answerIndex: 1,
            explanation: 'Unstructured pruning zeros individual weights, creating sparse matrices that standard hardware cannot accelerate efficiently. Structured pruning removes entire computational units, reducing the actual dimensions of matrix operations and producing measurable inference speedup.'
          }
        },
        {
          slug: 'architecture-research-practices',
          title: 'Architecture Design & Research Practices',
          minutes: 30,
          objectives: [
            'Read and critically evaluate deep learning research papers',
            'Design ablation studies to isolate the contribution of individual architectural choices',
            'Apply systematic experimentation practices: reproducibility, controlled variables and proper baselines'
          ],
          sections: [
            { heading: 'Reading research papers effectively', body: 'Start with the abstract and conclusion to understand the claimed contribution. Study the architecture diagram before the math. Identify the key innovation — usually one or two ideas — and trace how it flows through the method section. Read the experimental setup carefully: datasets, baselines, metrics and hyperparameter choices. The related work section contextualizes the contribution within the broader field.' },
            { heading: 'Ablation studies', body: 'An ablation study removes or disables individual components of a system to measure their contribution. If a proposed architecture adds skip connections, attention mechanisms and a new loss function, ablations test each in isolation against a baseline. This reveals which components actually matter and prevents crediting improvements to the wrong cause. Always include a strong baseline — comparing only against weak baselines inflates apparent improvements.' },
            { heading: 'Reproducibility and experimentation', body: 'Set random seeds for all sources of randomness: Python, NumPy, PyTorch and CUDA. Log every hyperparameter, environment detail and random seed. Use version control for code and configuration. Run each experiment at least 3 times with different seeds and report mean and standard deviation. Fix bugs at the first sign of anomalous loss curves rather than training for days hoping they resolve.' }
          ],
          links: [
            { title: 'Hugging Face Papers', url: 'https://huggingface.co/papers', sourceName: 'Hugging Face', resourceType: 'reference', relationship: 'Curated feed of the latest machine learning research papers with community discussions.' },
            { title: 'PyTorch Reproducibility Guide', url: 'https://pytorch.org/docs/stable/notes/randomness.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'How to set seeds and control randomness for reproducible experiments.' },
            { title: 'NVIDIA Research Publications', url: 'https://research.nvidia.com/publications', sourceName: 'NVIDIA Developer', resourceType: 'reference', relationship: 'NVIDIA research papers on deep learning architectures, training methods and hardware.' }
          ],
          quiz: {
            prompt: 'Why is it important to include a strong baseline in an ablation study?',
            options: [
              'To make the paper look longer and more thorough',
              'To ensure that claimed improvements are genuinely attributable to the proposed changes rather than to weak comparisons',
              'To reduce the number of experiments needed',
              'Baselines are required by conference submission rules only'
            ],
            answerIndex: 1,
            explanation: 'Comparing against weak baselines can make any improvement look significant. A strong baseline establishes a meaningful reference point, ensuring that the reported gains reflect genuine contributions of the new components.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Image Classification Pipeline with Transfer Learning',
    coverage: [
      'CNN Architecture Design',
      'GPU-Accelerated Training',
      'Transfer Learning & Fine-Tuning',
      'Model Optimization & Export',
      'Evaluation & Experiment Tracking'
    ],
    brief:
      'Build an end-to-end image classification system: fine-tune a pre-trained ResNet-50 on a custom dataset using PyTorch with GPU training, apply data augmentation and regularization, optimize the model through quantization, export it for inference, and evaluate with a comprehensive suite of metrics including per-class precision and confusion matrix.',
    requirements: [
      'Fine-tune a pre-trained model on a custom image dataset with at least 5 classes and 100 images per class',
      'Implement data augmentation pipeline (random crop, flip, color jitter, normalization)',
      'Use a learning rate scheduler with warmup and cosine annealing',
      'Train on GPU with mixed precision (torch.amp) and log GPU utilization',
      'Apply at least one regularization technique: dropout, weight decay or label smoothing',
      'Export the optimized model to ONNX or TorchScript',
      'Evaluate on a held-out test set with accuracy, per-class precision/recall and confusion matrix',
      'Track experiments with at least 3 runs varying one hyperparameter (learning rate, batch size or augmentation strength)'
    ],
    expectedOutput:
      'A complete PyTorch project with training script, evaluation notebook, exported model file, experiment tracking logs and a short report discussing architecture choices, training dynamics and final performance.',
    rubric: [
      { skill: 'Transfer Learning', weight: 25, criteria: 'Appropriate pre-trained model selection, proper freezing/unfreezing strategy, effective fine-tuning approach' },
      { skill: 'Training Pipeline', weight: 25, criteria: 'Correct data augmentation, learning rate scheduling, mixed precision usage and GPU utilization' },
      { skill: 'Evaluation Rigor', weight: 20, criteria: 'Comprehensive metrics beyond accuracy, confusion matrix analysis, per-class performance discussion' },
      { skill: 'Model Optimization', weight: 15, criteria: 'Successful quantization or pruning with measured speedup and minimal accuracy loss, proper ONNX export' },
      { skill: 'Code Quality & Reproducibility', weight: 15, criteria: 'Reproducible seeds, clear code structure, experiment tracking, meaningful ablation comparisons' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Build a CNN from Scratch for CIFAR-10',
      stage: 'Beginner',
      objective: 'Design, implement and train a convolutional neural network for image classification without relying on pre-trained models, demonstrating understanding of CNN fundamentals.',
      requirements: [
        'Implement a CNN with at least 3 convolutional layers, batch normalization and pooling',
        'Train on CIFAR-10 using PyTorch with a proper train/validation/test split',
        'Apply at least 2 data augmentation techniques',
        'Experiment with 2 different optimizers and compare convergence',
        'Achieve at least 85% test accuracy',
        'Plot training and validation loss curves to diagnose overfitting'
      ],
      skillsEvaluated: ['CNN Architecture', 'PyTorch Training Loop', 'Data Augmentation', 'Experimental Methodology'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit a complete Python script or notebook with the CNN implementation, training code, evaluation results and loss curve plots. Include a brief written analysis comparing the two optimizers.',
        textLabel: 'CNN design analysis',
        minTextLength: 800,
        linkLabels: ['Training logs and loss curves']
      }
    },
    {
      title: 'Sequence Model for Time Series Forecasting',
      stage: 'Intermediate',
      objective: 'Implement and compare RNN, LSTM and Transformer-based models for a univariate time series forecasting task, analyzing the strengths and weaknesses of each architecture.',
      requirements: [
        'Select a real-world time series dataset with at least 1000 data points',
        'Implement an RNN, LSTM and Transformer model for forecasting',
        'Create a standardized train/validation/test split respecting temporal ordering',
        'Apply consistent preprocessing (normalization, windowing) across all models',
        'Evaluate using MSE, MAE and MAPE metrics with proper cross-validation',
        'Write a comparative analysis explaining when each architecture is preferred'
      ],
      skillsEvaluated: ['RNN/LSTM Architecture', 'Transformer Architecture', 'Time Series Analysis', 'Model Comparison'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit a Jupyter notebook with all three model implementations, side-by-side evaluation metrics, visualizations of predictions and a written comparative analysis.',
        textLabel: 'Comparative architecture analysis',
        minTextLength: 1200,
        linkLabels: ['Evaluation metrics table']
      }
    },
    {
      title: 'Deploy an Optimized Model to Production',
      stage: 'Advanced',
      objective: 'Take a pre-trained model, apply quantization and optimization techniques, benchmark performance improvements, and create a production-ready inference service.',
      requirements: [
        'Start with a pre-trained vision or language model from Hugging Face or PyTorch Hub',
        'Apply post-training quantization (INT8) and measure accuracy impact',
        'Export to ONNX and optimize with ONNX Runtime or TensorRT',
        'Build a simple inference API with FastAPI that serves predictions',
        'Benchmark latency (p50, p95, p99) and throughput (requests/second) before and after optimization',
        'Document the accuracy-latency trade-off with a summary report'
      ],
      skillsEvaluated: ['Model Quantization', 'ONNX Export', 'Inference Optimization', 'API Development', 'Performance Benchmarking'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the complete project with model files, benchmarking scripts, API server code and a report comparing baseline versus optimized model performance.',
        textLabel: 'Optimization and deployment report',
        minTextLength: 1500,
        linkLabels: ['Benchmarking results dataset']
      }
    }
  ],

  simTasks: [
    {
      title: 'Training divergence on new dataset',
      context: 'Your team is fine-tuning a BERT model for a text classification task. After switching to a new, larger dataset, the training loss immediately spikes to NaN and never recovers. The previous smaller dataset trained fine. You need to diagnose and fix this within the next sprint.',
      requirements: [
        'Investigate possible causes: data corruption, learning rate mismatch, gradient explosion',
        'Check the new dataset for label distribution anomalies, extreme sequence lengths and encoding errors',
        'Implement gradient clipping and learning rate warmup as immediate mitigations',
        'Propose a systematic debugging checklist for future training failures'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'Root cause analysis with evidence, implemented fixes that stabilize training, and a reusable debugging checklist.',
      skills: ['PyTorch Debugging', 'Training Stability', 'Data Validation', 'Learning Rate Scheduling']
    },
    {
      title: 'Model accuracy dropped after quantization',
      context: 'The engineering team quantized a production image classification model from FP32 to INT8 for deployment on edge devices. Accuracy dropped from 94.2% to 78.1%, far exceeding the acceptable 1-2% threshold. You need to investigate why and propose a path forward.',
      requirements: [
        'Analyze which classes lost the most accuracy and identify patterns in the failures',
        'Compare per-layer weight distributions between FP32 and INT8 models',
        'Test quantization-aware training as an alternative to post-training quantization',
        'Recommend whether to use INT8, INT4 or a mixed-precision approach with evidence'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'Quantization analysis with per-class accuracy breakdown, weight distribution comparison and a quantitative recommendation.',
      skills: ['Model Quantization', 'Accuracy Analysis', 'Edge Deployment', 'PyTorch']
    },
    {
      title: 'Multi-GPU training is not scaling',
      context: 'Training a large vision model on 8 A100 GPUs is only 2.3x faster than single-GPU training instead of the expected 6-7x. Memory utilization varies across GPUs and some are idle during gradient synchronization. You need to identify the bottleneck and optimize the configuration.',
      requirements: [
        'Profile GPU utilization and identify which phase is the bottleneck (data loading, forward/backward, communication)',
        'Check for data loading bottlenecks using DataLoader worker profiling',
        'Verify gradient synchronization overhead with NCCL debugging tools',
        'Implement optimizations: increase DataLoader workers, tune DDP bucket_cap_mb, or switch to FSDP if memory-bound'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Profiling results identifying the bottleneck, implemented optimizations with measured throughput improvement, and documentation of the tuning process.',
      skills: ['Distributed Training', 'GPU Profiling', 'Performance Optimization', 'PyTorch DDP']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Aisha Patel',
      personaRole: 'ML Infrastructure Lead',
      situation: 'Debating whether to migrate the team\'s training pipeline from TensorFlow 1.x to PyTorch or keep the existing infrastructure.',
      openingMessage:
        'Our entire training pipeline is still TensorFlow 1.x with custom Estimator code. New hires all want PyTorch, and the research community has moved there. But migration means rewriting hundreds of experiments. I need a clear cost-benefit analysis before I go to leadership.',
      expectedPoints: [
        'Quantifies the migration cost in engineering hours and risk of introducing bugs',
        'Highlights PyTorch advantages: eager execution, debugging simplicity, research ecosystem',
        'Considers hybrid approach: keep TF for production inference, use PyTorch for new research',
        'Proposes a phased migration plan with clear milestones and rollback criteria'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Thompson',
      personaRole: 'Senior Software Engineer',
      situation: 'Discussion about the architecture of a new real-time object detection feature for an autonomous drone project.',
      openingMessage:
        'We need to run object detection at 30 FPS on an NVIDIA Jetson Orin inside a drone. The detection needs to identify 12 classes with at least 80% mAP. What model architecture and optimization strategy do you recommend?',
      expectedPoints: [
        'Evaluates YOLOv8/YOLO-NAS or EfficientDet as baseline architectures for real-time detection',
        'Discusses TensorRT optimization for Jetson deployment',
        'Addresses latency budget: 33ms per frame includes preprocessing, inference and NMS',
        'Proposes profiling on actual Jetson hardware before committing to an architecture'
      ]
    },
    {
      kind: 'client',
      personaName: 'Dr. Sarah Mitchell',
      personaRole: 'Head of Radiology AI, MedScan Diagnostics',
      situation: 'Client needs to understand why their medical imaging model performs well in the lab but poorly on data from different hospitals.',
      openingMessage:
        'Our chest X-ray classifier achieves 96% accuracy on data from Hospital A where it was trained, but drops to 71% on data from Hospital B. The clinical team is losing confidence. What is happening and how do we fix it?',
      expectedPoints: [
        'Explains distribution shift: different X-ray machines, patient demographics and imaging protocols',
        'Proposes domain adaptation or training with multi-site data to improve generalization',
        'Recommends evaluating on each site separately to quantify the shift precisely',
        'Discusses regulatory implications of deploying a model that performs inconsistently across sites'
      ]
    },
    {
      kind: 'client',
      personaName: 'James Okafor',
      personaRole: 'CTO, AgriPredict',
      situation: 'Client wants to know if deep learning is necessary for their crop disease detection app or if traditional computer vision would suffice.',
      openingMessage:
        'We want to build a mobile app that identifies crop diseases from leaf photos. Our budget is limited and our data science team has no deep learning experience. Should we invest in deep learning or use simpler image processing?',
      expectedPoints: [
        'Assesses the problem complexity: deep learning excels at fine-grained visual classification',
            'Acknowledges the learning curve and suggests pre-trained models as a middle ground',
            'Discusses deployment constraints: mobile inference requires model optimization (MobileNet, quantization)',
            'Proposes starting with a pre-trained model fine-tuned on their data rather than training from scratch'
          ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'A production NLP model serving sentiment analysis on customer reviews started returning identical predictions (always "positive") for all inputs after a scheduled infrastructure update. No code changes were deployed to the model service itself.',
      requiredActions: [
        { action: 'Check if the input preprocessing pipeline was modified during the infrastructure update (tokenizer version, text normalization)', good: true, note: 'Preprocessing changes are the most common cause of silent model behavior changes without model code modifications.' },
        { action: 'Verify that the model artifact loaded correctly by comparing model weights checksums against the last known good version', good: true, note: 'Weight corruption during deployment or storage migration can cause unpredictable behavior.' },
        { action: 'Roll back the infrastructure update immediately to restore service while investigating', good: true, note: 'Restore service first; diagnose root cause second. Customer-facing accuracy is the priority.' },
        { action: 'Assume the model is fine because no model code was changed and continue monitoring', good: false, note: 'Silent failures in ML systems require immediate investigation — the model is clearly broken.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Midway through developing a multi-label image classifier, the product team adds a requirement that the model must also provide confidence scores and uncertainty estimates for each prediction to meet new regulatory guidelines for the healthcare application.',
      requiredActions: [
        { action: 'Evaluate Monte Carlo dropout and ensemble methods for uncertainty estimation and their impact on inference latency', good: true, note: 'Uncertainty quantification has meaningful latency implications that affect the system design.' },
        { action: 'Assess whether the current architecture needs modification to support calibrated confidence scores', good: true, note: 'Standard softmax outputs are poorly calibrated; temperature scaling or ensemble methods may be needed.' },
        { action: 'Acknowledge the timeline impact and propose a phased delivery: classifier first, uncertainty estimation in a follow-up release', good: false, note: 'The regulatory requirement is not optional — delaying it risks compliance violations.' },
        { action: 'Update the evaluation suite to include calibration metrics (ECE, Brier score) alongside accuracy', good: true, note: 'New requirements need new evaluation criteria to ensure the system meets them before deployment.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between data parallelism and model parallelism. When would you choose one over the other?',
      guidancePoints: [
        'Data parallelism replicates the model and splits data across GPUs — best when model fits in single GPU memory',
        'Model parallelism splits the model across GPUs — necessary when model is too large for one GPU',
        'Pipeline parallelism is a form of model parallelism that micro-pipelines batches through model stages',
        'ZeRO optimization partitions optimizer states and gradients to reduce memory per GPU in data parallelism',
        'Real-world large-scale training often combines approaches: tensor parallelism within nodes, data parallelism across nodes'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the difference between post-training quantization and quantization-aware training? Give an example scenario for each.',
      guidancePoints: [
        'Post-training quantization applies INT8 conversion after training without retraining — fast but may lose accuracy',
        'Quantization-aware training simulates low-precision during training, allowing the model to adapt — better accuracy but requires retraining',
        'Post-training works well for simple models on clean data; QAT is needed when accuracy degradation exceeds acceptable threshold',
        'ONNX Runtime and TensorRT both support both approaches with varying levels of automation',
        'Calibration data is needed for post-training quantization to determine activation ranges'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your CNN model achieves 98% training accuracy but only 72% validation accuracy. Walk through your diagnostic process and potential fixes.',
      guidancePoints: [
        'This is a classic overfitting pattern — the model memorizes training data but fails to generalize',
        'First check: is the validation set properly representative and preprocessed identically to training?',
        'Apply regularization: dropout, weight decay, data augmentation or early stopping',
        'Consider whether the model is too large for the dataset size — try a smaller architecture',
        'Check for data leakage in training set that inflates training accuracy artificially'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A transformer model you are training produces loss that decreases for the first few epochs then suddenly diverges to NaN. What are the most likely causes and how do you fix each?',
      guidancePoints: [
        'Learning rate too high for the current training phase — try lower LR with warmup',
        'Gradient explosion — implement gradient clipping (max_norm parameter in PyTorch)',
        'Data corruption: a batch containing NaN or extreme values after a certain epoch due to data shuffling',
        'Numerical instability in specific layers (e.g., LayerNorm with zero-variance batches) — add epsilon to denominators',
        'Mixed precision training without proper loss scaling causing FP16 underflow'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The research team proposes using a 70B parameter model for a feature that currently uses a 1B parameter model. The latency SLA is 200ms. How do you evaluate this proposal?',
      guidancePoints: [
        'Quantify the latency impact: 70B requires far more compute, likely exceeding 200ms on current hardware',
        'Evaluate whether the accuracy gain justifies the 70x increase in compute and memory cost',
        'Propose alternatives: knowledge distillation to get 70B quality in a smaller model, or speculatively decoding',
        'Consider inference cost at scale — API or GPU costs at production traffic volume',
        'Recommend a proof-of-concept with latency benchmarks on representative hardware before committing'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you recommend against using deep learning for a computer vision task, even though it is technically feasible?',
      guidancePoints: [
        'When the problem is simple enough for traditional CV: template matching, edge detection, thresholding',
        'When labeled training data is unavailable or prohibitively expensive to collect',
        'When explainability is critical and black-box models are unacceptable (certain legal or medical contexts)',
        'When latency requirements exceed what any neural network can achieve on available hardware',
        'When the problem rules are well-defined and deterministic rather than requiring learned patterns'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain the concept of "receptive field" in a CNN to a product manager who has no machine learning background.',
      guidancePoints: [
        'Use the analogy of a flashlight: each neuron can only "see" a small region of the input image',
        'Deeper layers see larger regions because pooling and strided convolutions expand the effective view',
        'Explain why this matters: small receptive fields miss large-scale patterns, large ones miss fine details',
        'Connect it to the product: detecting small defects requires different architecture than identifying whole objects',
        'Avoid jargon: replace "receptive field" with "what part of the image the model is looking at"'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your team has trained a deep learning model that performs well in testing. The VP of Engineering asks: "Why can\'t we just deploy this and guarantee it will be accurate 99% of the time?" How do you respond?',
      guidancePoints: [
        'Explain that model performance depends on the input distribution matching what it was trained on',
        'Discuss non-deterministic inputs: edge cases, adversarial examples and out-of-distribution data',
        'Describe the need for monitoring, feedback loops and periodic retraining in production',
        'Set realistic expectations: 99% on a test set does not mean 99% on all future inputs',
        'Propose a monitoring plan: track prediction distributions, alert on distribution shift, establish a retraining cadence'
      ]
    }

  ]

}

import type { CareerDef } from '../framework.js'

export const machineLearningEngineer: CareerDef = {
  slug: 'machine-learning-engineer',
  name: 'Machine Learning Engineer',
  category: 'AI & Data',
  order: 15,
  description:
    'Trains, evaluates and deploys machine learning models with scikit-learn, PyTorch and TensorFlow in real pipelines.',
  difficulty: 'Advanced',
  pathSummary:
    'Python & numerical computing foundations → classical ML with scikit-learn → deep learning with PyTorch → production TensorFlow & deployment → MLOps, monitoring & scaling.',
  mainSkills: [
    'Python',
    'NumPy & Pandas',
    'scikit-learn',
    'PyTorch',
    'TensorFlow',
    'Model Evaluation & Metrics',
    'Feature Engineering',
    'MLOps & Model Deployment'
  ],
  sourcePlatforms: [
    'Python Documentation',
    'NumPy',
    'pandas',
    'scikit-learn',
    'PyTorch',
    'TensorFlow',
    'Hugging Face'
  ],
  companyName: 'DeepCurrent Labs',
  roleTitle: 'Machine Learning Engineer',

  chapters: [
    {
      slug: 'python-numerical-foundations',
      stage: 'Beginner',
      title: 'Python & Numerical Computing Foundations',
      description:
        'The Python, NumPy and pandas skills every machine learning engineer depends on daily.',
      topics: [
        {
          slug: 'python-for-ml',
          title: 'Python for Machine Learning',
          minutes: 28,
          objectives: [
            'Write type-hinted Python with functions, classes and modules for ML pipelines',
            'Use comprehensions, generators and itertools for data transformation',
            'Manage virtual environments and dependencies with pip and conda'
          ],
          sections: [
            {
              heading: 'Python as the ML language',
              body: 'Python dominates machine learning because every major framework — scikit-learn, PyTorch, TensorFlow, Hugging Face — publishes a Python-first SDK. Idiomatic Python with type hints, context managers and f-strings keeps ML codebases maintainable as they grow from notebooks to production services.'
            },
            {
              heading: 'Data structures and iteration patterns',
              body: 'Dictionaries hold hyperparameter grids, lists collect metric results during cross-validation and generators stream large datasets without exhausting memory. List and dictionary comprehensions express feature transformations concisely, while itertools provides combinatorial utilities for search-space construction.'
            },
            {
              heading: 'Packaging ML code',
              body: 'Structure projects as installable packages with pyproject.toml so dependencies are reproducible. Use virtual environments or conda to isolate project dependencies. Separate raw data, notebooks and source modules into well-defined directories so pipelines remain navigable as complexity grows.'
            }
          ],
          links: [
            {
              title: 'The Python Tutorial',
              url: 'https://docs.python.org/3/tutorial/',
              sourceName: 'Python Documentation',
              resourceType: 'tutorial',
              relationship: 'Official introduction to Python syntax and language features.'
            },
            {
              title: 'Virtual Environments and Packages',
              url: 'https://docs.python.org/3/tutorial/venv.html',
              sourceName: 'Python Documentation',
              resourceType: 'guide',
              relationship: 'How to create isolated Python environments for ML projects.'
            },
            {
              title: 'Python Module of the Week — itertools',
              url: 'https://pymotw.com/3/itertools/',
              sourceName: 'Python Documentation',
              resourceType: 'reference',
              relationship: 'Combinatorial and iterator utilities useful for hyperparameter search.'
            }
          ],
          quiz: {
            prompt: 'Why is a virtual environment preferred over installing packages globally for ML projects?',
            options: [
              'It makes Python run faster',
              'It isolates project dependencies so different projects do not conflict',
              'It automatically installs GPU drivers',
              'It is required by scikit-learn'
            ],
            answerIndex: 1,
            explanation:
              'Virtual environments prevent dependency conflicts between projects — one project may need PyTorch 1.13 while another requires 2.0, and both can coexist safely.'
          }
        },
        {
          slug: 'numpy-fundamentals',
          title: 'NumPy Fundamentals for ML',
          minutes: 30,
          objectives: [
            'Create and manipulate multi-dimensional arrays and tensors',
            'Apply vectorized operations, broadcasting and linear algebra functions',
            'Index, slice and reshape arrays for feature and batch preparation'
          ],
          sections: [
            {
              heading: 'Arrays as the universal data container',
              body: 'NumPy ndarray is the backbone of numerical Python. Every ML framework converts input data into NumPy arrays or tensor structures before computation. Vectorized operations on arrays execute in optimized C, making them orders of magnitude faster than equivalent Python loops — critical when preprocessing millions of training samples.'
            },
            {
              heading: 'Broadcasting and vectorization',
              body: 'Broadcasting lets you apply operations between arrays of different shapes without explicit loops — adding a bias vector to every row of a matrix, for instance. Understanding broadcasting rules prevents subtle shape errors and eliminates slow Python-level iteration in preprocessing pipelines.'
            },
            {
              heading: 'Linear algebra building blocks',
              body: 'Matrix multiplication, dot products, eigenvalue decomposition and singular value decomposition are the mathematical primitives of ML. NumPy provides np.dot, np.linalg.eig, np.linalg.svd and more, all backed by BLAS/LAPACK for speed. Feature normalization, PCA and dimensionality reduction all start here.'
            }
          ],
          links: [
            {
              title: 'NumPy Quickstart',
              url: 'https://numpy.org/doc/stable/user/quickstart.html',
              sourceName: 'NumPy',
              resourceType: 'tutorial',
              relationship: 'Essential NumPy array operations and broadcasting.'
            },
            {
              title: 'NumPy for MATLAB Users',
              url: 'https://numpy.org/doc/stable/user/numpy-for-matlab-users.html',
              sourceName: 'NumPy',
              resourceType: 'guide',
              relationship: 'Quick reference for linear algebra and array operations.'
            },
            {
              title: 'NumPy API Reference — linalg',
              url: 'https://numpy.org/doc/stable/reference/routines.linalg.html',
              sourceName: 'NumPy',
              resourceType: 'reference',
              relationship: 'Linear algebra routines used throughout machine learning.'
            }
          ],
          quiz: {
            prompt: 'Broadcasting in NumPy allows you to add a (1, 3) array to a (5, 3) array without loops. How does this work?',
            options: [
              'NumPy copies the smaller array into the shape of the larger one in memory',
              'NumPy transparently repeats the smaller array along the missing dimension during the operation',
              'It raises an error because shapes do not match',
              'It only works with identical shapes'
            ],
            answerIndex: 1,
            explanation:
              'Broadcasting aligns shapes from the trailing dimension and implicitly repeats arrays along dimensions of size 1, avoiding expensive memory copies while enabling concise vectorized expressions.'
          }
        },
        {
          slug: 'pandas-data-wrangling',
          title: 'Pandas for Data Wrangling',
          minutes: 28,
          objectives: [
            'Load, clean and transform tabular data with DataFrames',
            'Handle missing values, duplicates and type conversions',
            'Perform groupby aggregation, merging and time-series operations'
          ],
          sections: [
            {
              heading: 'DataFrames as structured datasets',
              body: 'A pandas DataFrame is a labeled, two-dimensional table where columns can hold different data types. For ML engineers, DataFrames are the primary interface for loading CSVs, SQL query results and parquet files into a form ready for feature engineering and train/test splitting.'
            },
            {
              heading: 'Cleaning real-world data',
              body: 'Real datasets have missing values, inconsistent formatting and duplicates. Pandas provides fillna, dropna, astype, apply and map to clean data systematically. Detecting and imputing missing values is a critical preprocessing step before any model training.'
            },
            {
              heading: 'Grouping and joining',
              body: 'groupby lets you aggregate statistics per category — mean purchase value per customer, average session length per day. Merge and join operations combine tables by key, analogous to SQL joins. These operations underpin feature engineering where you derive aggregated features from raw event logs.'
            }
          ],
          links: [
            {
              title: '10 Minutes to Pandas',
              url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
              sourceName: 'pandas',
              resourceType: 'tutorial',
              relationship: 'Rapid introduction to DataFrame operations.'
            },
            {
              title: 'Pandas Getting Started',
              url: 'https://pandas.pydata.org/docs/getting_started/index.html',
              sourceName: 'pandas',
              resourceType: 'tutorial',
              relationship: 'Official pandas introduction and installation guide.'
            },
            {
              title: 'Pandas User Guide — Missing Data',
              url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html',
              sourceName: 'pandas',
              resourceType: 'guide',
              relationship: 'How to detect, remove and fill missing data in DataFrames.'
            }
          ],
          quiz: {
            prompt: 'What is the correct way to fill all NaN values in a column with the column mean?',
            options: [
              "df['col'].fillna(df['col'].mean())",
              "df['col'].replace(np.nan, df['col'].mean())",
              "df['col'].dropna(df['col'].mean())",
              "df['col'].map(np.nan, df['col'].mean())"
            ],
            answerIndex: 0,
            explanation:
              'fillna() accepts a scalar, Series or dictionary to replace NaN values. Using the column mean is a standard imputation strategy for numerical features.'
          }
        }
      ]
    },
    {
      slug: 'classical-ml-scikit-learn',
      stage: 'Foundation',
      title: 'Classical Machine Learning with scikit-learn',
      description:
        'Mastering the algorithms, preprocessing utilities and evaluation frameworks that form the backbone of applied ML.',
      topics: [
        {
          slug: 'supervised-learning-algorithms',
          title: 'Supervised Learning Algorithms',
          minutes: 30,
          objectives: [
            'Implement linear regression, logistic regression and decision trees',
            'Understand bias-variance trade-off and model complexity',
            'Tune hyperparameters with grid search and random search'
          ],
          sections: [
            {
              heading: 'Regression and classification',
              body: 'Supervised learning trains a model on labeled data to predict outcomes. Linear regression fits a weighted sum for continuous targets. Logistic regression maps inputs to probabilities for binary classification. Decision trees recursively split features to minimize impurity, producing interpretable rules. Scikit-learn provides a uniform API — fit, predict, score — across all these estimators.'
            },
            {
              heading: 'Bias-variance trade-off',
              body: 'High-bias models underfit — they are too simple to capture the underlying pattern. High-variance models overfit — they memorize noise in the training data. The bias-variance trade-off is the central tension in ML: you want a model complex enough to learn the signal but simple enough to generalize to unseen data. Regularization and cross-validation help navigate this balance.'
            },
            {
              heading: 'Hyperparameter tuning',
              body: 'Model performance depends heavily on hyperparameters like learning rate, tree depth and regularization strength. Grid search exhaustively tries all combinations. Random search samples a fixed budget of combinations and often finds equally good results faster. Scikit-learn wraps both in GridSearchCV and RandomizedSearchCV with built-in cross-validation.'
            }
          ],
          links: [
            {
              title: 'scikit-learn Supervised Learning Overview',
              url: 'https://scikit-learn.org/stable/supervised_learning.html',
              sourceName: 'scikit-learn',
              resourceType: 'guide',
              relationship: 'Official overview of supervised learning algorithms in scikit-learn.'
            },
            {
              title: 'User Guide — Grid Search',
              url: 'https://scikit-learn.org/stable/modules/grid_search.html',
              sourceName: 'scikit-learn',
              resourceType: 'guide',
              relationship: 'How to tune hyperparameters with cross-validated grid and random search.'
            },
            {
              title: 'User Guide — Decision Trees',
              url: 'https://scikit-learn.org/stable/modules/tree.html',
              sourceName: 'scikit-learn',
              resourceType: 'reference',
              relationship: 'Decision tree algorithms and their parameters.'
            }
          ],
          quiz: {
            prompt: 'When a decision tree achieves 99% accuracy on training data but only 72% on validation data, the model is most likely…',
            options: [
              'Underfitting due to insufficient depth',
              'Overfitting — it has memorized training noise',
              'Suffering from data leakage',
              'Using an inappropriate metric'
            ],
            answerIndex: 1,
            explanation:
              'A large gap between training and validation performance is the hallmark of overfitting. The tree has learned patterns specific to the training set that do not generalize.'
          }
        },
        {
          slug: 'feature-engineering-preprocessing',
          title: 'Feature Engineering & Preprocessing',
          minutes: 28,
          objectives: [
            'Apply scaling, encoding and transformation pipelines to raw data',
            'Select informative features using filter, wrapper and embedded methods',
            'Build reproducible preprocessing pipelines with scikit-learn Pipeline'
          ],
          sections: [
            {
              heading: 'Preprocessing transforms',
              body: 'Most ML algorithms require features on comparable scales. StandardScaler normalizes to zero mean and unit variance. MinMaxScaler bounds values between zero and one. OneHotEncoder converts categorical labels into binary columns. These transformers fit on training data and transform both training and test data to prevent information leakage.'
            },
            {
              heading: 'Feature creation and selection',
              body: 'Feature engineering creates new informative columns from existing data — polynomial features, interaction terms, date decomposition and text vectorization. Feature selection then identifies which features actually contribute to prediction. SelectKBest, mutual information and L1 regularization (Lasso) help remove noise and reduce dimensionality.'
            },
            {
              heading: 'Scikit-learn Pipelines',
              body: 'Pipeline chains preprocessing and model steps into a single object that can be fit, predict and cross-validated as one unit. This eliminates data leakage from preprocessing on the full dataset before splitting and makes serialization and deployment straightforward — one object to save, one object to load.'
            }
          ],
          links: [
            {
              title: 'User Guide — Preprocessing',
              url: 'https://scikit-learn.org/stable/modules/preprocessing.html',
              sourceName: 'scikit-learn',
              resourceType: 'guide',
              relationship: 'Official guide to scaling, normalization and encoding transforms.'
            },
            {
              title: 'User Guide — Feature Selection',
              url: 'https://scikit-learn.org/stable/modules/feature_selection.html',
              sourceName: 'scikit-learn',
              resourceType: 'guide',
              relationship: 'Methods for selecting the most informative features.'
            },
            {
              title: 'User Guide — Pipeline Utilities',
              url: 'https://scikit-learn.org/stable/modules/compose.html',
              sourceName: 'scikit-learn',
              resourceType: 'guide',
              relationship: 'Building reproducible preprocessing and modeling pipelines.'
            }
          ],
          quiz: {
            prompt: 'Why must StandardScaler be fit only on the training split and not on the full dataset?',
            options: [
              'It is computationally cheaper to fit on a subset',
              'Fitting on the full dataset lets test-set statistics leak into training, invalidating evaluation',
              'scikit-learn does not allow fitting on the full dataset',
              'It does not matter — scaling is deterministic'
            ],
            answerIndex: 1,
            explanation:
              'Fitting a scaler on the full dataset includes test-set statistics in the transformation, causing information leakage and overly optimistic performance estimates.'
          }
        },
        {
          slug: 'model-evaluation-metrics',
          title: 'Model Evaluation & Metrics',
          minutes: 30,
          objectives: [
            'Perform stratified k-fold cross-validation and understand its purpose',
            'Select appropriate metrics for regression, classification and ranking',
            'Interpret confusion matrices, ROC curves and precision-recall curves'
          ],
          sections: [
            {
              heading: 'Cross-validation',
              body: 'A single train/test split gives a noisy estimate of generalization performance. Stratified k-fold cross-validation splits the data into k folds preserving class distribution, trains on k-1 folds and evaluates on the remaining fold, rotating through all folds. The mean and standard deviation across folds give a robust performance estimate with variance indication.'
            },
            {
              heading: 'Classification metrics',
              body: 'Accuracy is misleading on imbalanced datasets — a model predicting the majority class scores well despite learning nothing. Precision measures how many predicted positives are actually positive. Recall measures how many actual positives are detected. The F1-score balances both. ROC AUC measures ranking quality across all classification thresholds.'
            },
            {
              heading: 'Regression metrics',
              body: 'Mean absolute error (MAE) is interpretable as average prediction error. Mean squared error (MSE) penalizes large errors more heavily. Root mean squared error (RMSE) is in the same units as the target. R-squared measures the proportion of variance explained. Choose the metric that matches the business cost of different error magnitudes.'
            }
          ],
          links: [
            {
              title: 'User Guide — Cross-validation',
              url: 'https://scikit-learn.org/stable/modules/cross_validation.html',
              sourceName: 'scikit-learn',
              resourceType: 'guide',
              relationship: 'How to evaluate model performance with cross-validation.'
            },
            {
              title: 'User Guide — Classification Metrics',
              url: 'https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics',
              sourceName: 'scikit-learn',
              resourceType: 'reference',
              relationship: 'Precision, recall, F1, ROC AUC and other classification metrics.'
            },
            {
              title: 'User Guide — Regression Metrics',
              url: 'https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics',
              sourceName: 'scikit-learn',
              resourceType: 'reference',
              relationship: 'MAE, MSE, RMSE and R-squared for regression evaluation.'
            }
          ],
          quiz: {
            prompt: 'In a fraud detection dataset where only 0.5% of transactions are fraudulent, which metric is most informative?',
            options: [
              'Accuracy',
              'F1-score or precision-recall AUC',
              'R-squared',
              'Mean absolute error'
            ],
            answerIndex: 1,
            explanation:
              'Accuracy is misleading when classes are heavily imbalanced — predicting "not fraud" every time yields 99.5% accuracy. F1 and PR-AUC focus on the minority class performance where it matters.'
          }
        }
      ]
    },
    {
      slug: 'deep-learning-pytorch',
      stage: 'Intermediate',
      title: 'Deep Learning with PyTorch',
      description:
        'Building, training and debugging neural networks with PyTorch\'s dynamic computation graphs.',
      topics: [
        {
          slug: 'pytorch-tensors-autograd',
          title: 'PyTorch Tensors & Autograd',
          minutes: 28,
          objectives: [
            'Create and manipulate tensors on CPU and GPU',
            'Understand autograd and automatic differentiation',
            'Build computation graphs and compute gradients manually'
          ],
          sections: [
            {
              heading: 'Tensors as GPU-ready data',
              body: 'A PyTorch tensor is like a NumPy ndarray but with GPU acceleration and automatic differentiation. Tensors support the same slicing, reshaping and broadcasting operations, plus .to(device) to move data to CUDA. Moving both model weights and input tensors to the same device is a prerequisite for GPU training.'
            },
            {
              heading: 'Autograd — automatic differentiation',
              body: 'Setting requires_grad=True on a tensor tells PyTorch to track every operation on it. After a forward pass, calling .backward() on the loss tensor computes gradients for every leaf tensor with requires_grad=True. This is the engine behind backpropagation — you define the forward computation and autograd derives the gradients.'
            },
            {
              heading: 'Building computation graphs',
              body: 'Every arithmetic operation on tensors builds a directed acyclic graph of the computation. The graph is traversed in reverse during backward() to propagate gradients. torch.no_grad() disables graph construction for inference, reducing memory usage and improving speed when gradients are not needed.'
            }
          ],
          links: [
            {
              title: 'PyTorch Tensor Tutorial',
              url: 'https://pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html',
              sourceName: 'PyTorch',
              resourceType: 'tutorial',
              relationship: 'Official introduction to tensors and operations in PyTorch.'
            },
            {
              title: 'PyTorch Autograd Mechanics',
              url: 'https://pytorch.org/docs/stable/autograd.html',
              sourceName: 'PyTorch',
              resourceType: 'reference',
              relationship: 'Deep dive into automatic differentiation and computation graphs.'
            },
            {
              title: 'PyTorch Quickstart',
              url: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
              sourceName: 'PyTorch',
              resourceType: 'tutorial',
              relationship: 'End-to-end PyTorch basics covering tensors, autograd and models.'
            }
          ],
          quiz: {
            prompt: 'What happens when you call .backward() on a scalar loss in PyTorch?',
            options: [
              'It deletes the computation graph to save memory',
              'It computes the gradient of the loss with respect to every tensor that has requires_grad=True',
              'It resets all model weights',
              'It triggers a GPU synchronization point only'
            ],
            answerIndex: 1,
            explanation:
              'backward() traverses the computation graph in reverse, accumulating gradients into the .grad attribute of every leaf tensor with requires_grad=True.'
          }
        },
        {
          slug: 'neural-network-architecture',
          title: 'Building Neural Network Architectures',
          minutes: 30,
          objectives: [
            'Define feedforward networks with nn.Module and custom layers',
            'Select appropriate activation functions for hidden and output layers',
            'Configure loss functions and optimizers for different tasks'
          ],
          sections: [
            {
              heading: 'nn.Module and layers',
              body: 'PyTorch neural networks inherit from nn.Module. Each layer is an nn.Linear, nn.Conv2d or custom module registered in __init__. The forward method defines the data flow. This design makes it natural to compose complex architectures from reusable blocks and to load/save model weights consistently.'
            },
            {
              heading: 'Activation functions',
              body: 'Activations introduce nonlinearity — without them, a stack of linear layers collapses into a single linear transformation. ReLU is the default for hidden layers due to simplicity and reduced vanishing gradients. Sigmoid and softmax are used in output layers for binary and multi-class classification respectively. LeakyReLU and GELU offer alternatives for specific architectures.'
            },
            {
              heading: 'Loss functions and optimizers',
              body: 'CrossEntropyLoss combines log-softmax and NLL loss for multi-class classification. MSELoss is standard for regression. BCEWithLogitsLoss handles binary classification with numerical stability. SGD with momentum, Adam and AdamW are the most common optimizers — Adam adapts learning rates per-parameter, making it a strong default for most problems.'
            }
          ],
          links: [
            {
              title: 'PyTorch Neural Networks Tutorial',
              url: 'https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html',
              sourceName: 'PyTorch',
              resourceType: 'tutorial',
              relationship: 'How to define, build and instantiate neural networks in PyTorch.'
            },
            {
              title: 'PyTorch nn.Module Documentation',
              url: 'https://pytorch.org/docs/stable/generated/torch.nn.Module.html',
              sourceName: 'PyTorch',
              resourceType: 'reference',
              relationship: 'Complete reference for the Module base class.'
            },
            {
              title: 'PyTorch Optimizers',
              url: 'https://pytorch.org/docs/stable/optim.html',
              sourceName: 'PyTorch',
              resourceType: 'reference',
              relationship: 'SGD, Adam, AdamW and other optimizers with usage patterns.'
            }
          ],
          quiz: {
            prompt: 'Why is ReLU preferred over sigmoid for hidden layer activations in deep networks?',
            options: [
              'ReLU outputs values between 0 and 1',
              'ReLU avoids the vanishing gradient problem that sigmoid causes in deep stacks',
              'ReLU always produces negative outputs',
              'Sigmoid requires a GPU to compute efficiently'
            ],
            answerIndex: 1,
            explanation:
              'Sigmoid squashes outputs to a narrow range and its gradient vanishes for large or small inputs, stalling learning in deep networks. ReLU maintains a constant gradient for positive inputs, enabling deeper architectures.'
          }
        },
        {
          slug: 'training-loop-debugging',
          title: 'Training Loops & Debugging',
          minutes: 30,
          objectives: [
            'Implement a complete training loop with batching, logging and checkpointing',
            'Diagnose common training failures: vanishing gradients, divergence and overfitting',
            'Use learning rate scheduling and early stopping effectively'
          ],
          sections: [
            {
              heading: 'The training loop anatomy',
              body: 'A training loop iterates over epochs: for each batch, zero gradients, forward pass, compute loss, backward pass and update weights. Between epochs, evaluate on a validation set, log metrics and save checkpoints. DataLoader with num_workers and pin_memory enables efficient data loading on GPU. Gradient clipping prevents exploding gradients in recurrent architectures.'
            },
            {
              heading: 'Diagnosing training failures',
              body: 'Loss staying flat means the learning rate is too low or gradients are not flowing. Loss exploding to NaN indicates diverging gradients — reduce learning rate or add gradient clipping. Training loss decreasing but validation loss increasing signals overfitting — add regularization, dropout or more data. TensorBoard and loss curves are the primary diagnostic tools.'
            },
            {
              heading: 'LR scheduling and early stopping',
              body: 'Learning rate schedulers reduce the LR during training — StepLR drops it periodically, CosineAnnealingLR follows a cosine curve and ReduceLROnPlateau reacts to validation metrics. Early stopping monitors validation loss and halts training when it stops improving, preventing overfitting and saving compute time.'
            }
          ],
          links: [
            {
              title: 'PyTorch Training Loop Tutorial',
              url: 'https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html',
              sourceName: 'PyTorch',
              resourceType: 'tutorial',
              relationship: 'Building a complete training loop with optimizers and schedulers.'
            },
            {
              title: 'PyTorch DataLoader Documentation',
              url: 'https://pytorch.org/docs/stable/data.html',
              sourceName: 'PyTorch',
              resourceType: 'reference',
              relationship: 'Efficient data loading with batching, shuffling and parallel workers.'
            },
            {
              title: 'PyTorch TensorBoard Integration',
              url: 'https://pytorch.org/tutorials/recipes/recipes/tensorboard_with_pytorch.html',
              sourceName: 'PyTorch',
              resourceType: 'tutorial',
              relationship: 'Logging training metrics to TensorBoard for visualization.'
            }
          ],
          quiz: {
            prompt: 'During training, the training loss decreases steadily but the validation loss begins increasing after epoch 10. The most likely diagnosis is…',
            options: [
              'The learning rate is too high',
              'The model is overfitting to the training data',
              'The validation set is corrupted',
              'The batch size is too small'
            ],
            answerIndex: 1,
            explanation:
              'When training loss keeps dropping while validation loss rises, the model is memorizing training-specific patterns rather than learning generalizable features — the definition of overfitting.'
          }
        }
      ]
    },
    {
      slug: 'production-ml-tensorflow',
      stage: 'Advanced',
      title: 'Production ML with TensorFlow & Deployment',
      description:
        'Building production-grade models with TensorFlow, serving them reliably and monitoring performance at scale.',
      topics: [
        {
          slug: 'tensorflow-model-building',
          title: 'TensorFlow Model Building & Training',
          minutes: 30,
          objectives: [
            'Build and train models with the Keras Sequential and Functional APIs',
            'Use tf.data for efficient input pipelines with batching and prefetching',
            'Apply mixed-precision training and distribution strategies'
          ],
          sections: [
            {
              heading: 'Keras APIs for model definition',
              body: 'TensorFlow\'s Keras API provides two model-building styles. Sequential stacks layers in order for simple architectures. The Functional API supports multi-input, multi-output and shared-layer models — essential for tasks like object detection or multi-task learning. Both compile with an optimizer, loss and metrics before training with model.fit().'
            },
            {
              heading: 'tf.data input pipelines',
              body: 'tf.data.Dataset is TensorFlow\'s mechanism for building efficient data loading pipelines. Chaining map, batch, shuffle, prefetch and cache operations creates a streaming pipeline that feeds the GPU without bottlenecks. AUTOTUNE lets TensorFlow dynamically size parallel data loading threads based on hardware capability.'
            },
            {
              heading: 'Scaling training',
              body: 'Mixed-precision training with tf.keras.mixed_policy uses float16 computation and float32 master weights, reducing memory usage and accelerating training on modern GPUs with tensor cores. tf.distribute.MirroredStrategy copies training across multiple GPUs. For larger scale, MultiWorkerMirroredStrategy distributes across machines.'
            }
          ],
          links: [
            {
              title: 'TensorFlow Quickstart',
              url: 'https://www.tensorflow.org/tutorials/quickstart/beginner',
              sourceName: 'TensorFlow',
              resourceType: 'tutorial',
              relationship: 'Official TensorFlow introduction covering model building and training.'
            },
            {
              title: 'tf.data Documentation',
              url: 'https://www.tensorflow.org/guide/data',
              sourceName: 'TensorFlow',
              resourceType: 'guide',
              relationship: 'Building efficient input pipelines with tf.data.'
            },
            {
              title: 'Distributed Training Guide',
              url: 'https://www.tensorflow.org/guide/distributed_training',
              sourceName: 'TensorFlow',
              resourceType: 'guide',
              relationship: 'Multi-GPU and multi-worker training strategies.'
            }
          ],
          quiz: {
            prompt: 'What does tf.data.Dataset.prefetch(tf.data.AUTOTUNE) do?',
            options: [
              'Loads all data into RAM before training begins',
              'Prepares the next batches in the background while the current batch trains on the GPU',
              'Duplicates the dataset for multi-GPU training',
              'Compresses the dataset to save disk space'
            ],
            answerIndex: 1,
            explanation:
              'prefetch overlaps data preparation with model training so the GPU is never idle waiting for the next batch — AUTOTUNE lets TensorFlow choose the optimal prefetch buffer size.'
          }
        },
        {
          slug: 'model-optimization-export',
          title: 'Model Optimization & Export',
          minutes: 28,
          objectives: [
            'Quantize and prune models for inference efficiency',
            'Export models to SavedModel, TFLite and ONNX formats',
            'Optimize latency and throughput for serving environments'
          ],
          sections: [
            {
              heading: 'Quantization and pruning',
              body: 'Quantization reduces model weight precision from float32 to float16 or int8, shrinking model size and accelerating inference with minimal accuracy loss. Post-training quantization applies after training; quantization-aware training simulates low-precision effects during training for better accuracy. Structured pruning removes entire filters or attention heads, reducing computation directly.'
            },
            {
              heading: 'Model export formats',
              body: 'SavedModel is TensorFlow\'s native serialization format, containing the graph, weights and metadata. TFLite optimizes models for mobile and edge devices with hardware-accelerated delegates. ONNX is a cross-framework format enabling TensorFlow models to run in ONNX Runtime or be deployed to non-TensorFlow serving stacks.'
            },
            {
              heading: 'Latency optimization',
              body: 'XLA compilation fuses operations and optimizes the computation graph for the target hardware. GPU inference benefits from persistent kernels and reduced host-device transfers. For CPU, Intel MKL-optimized builds and thread pinning improve throughput. Benchmarking with tf.function and TensorRT provides concrete latency measurements.'
            }
          ],
          links: [
            {
              title: 'TensorFlow Quantization Guide',
              url: 'https://www.tensorflow.org/model_optimization/guide/quantization',
              sourceName: 'TensorFlow',
              resourceType: 'guide',
              relationship: 'Post-training and quantization-aware training for model compression.'
            },
            {
              title: 'TensorFlow Lite Documentation',
              url: 'https://www.tensorflow.org/lite',
              sourceName: 'TensorFlow',
              resourceType: 'documentation',
              relationship: 'Deploying optimized models to mobile and edge devices.'
            },
            {
              title: 'SavedModel Guide',
              url: 'https://www.tensorflow.org/guide/saved_model',
              sourceName: 'TensorFlow',
              resourceType: 'guide',
              relationship: 'Saving and loading TensorFlow models in production.'
            }
          ],
          quiz: {
            prompt: 'Post-training quantization from float32 to int8 typically reduces model size by approximately…',
            options: [
              '10%',
              '25%',
              '50%',
              '75%'
            ],
            answerIndex: 3,
            explanation:
              'Int8 weights are 4x smaller than float32 weights. In practice, model size reduction is close to 75% since most model parameters are weights, with some overhead from quantization metadata.'
          }
        },
        {
          slug: 'mlops-monitoring',
          title: 'MLOps, Monitoring & Scaling',
          minutes: 30,
          objectives: [
            'Package models in containers and deploy to serving infrastructure',
            'Monitor data drift, concept drift and model degradation in production',
            'Implement CI/CD pipelines for automated model retraining and deployment'
          ],
          sections: [
            {
              heading: 'Containerized model serving',
              body: 'Packaging models in Docker containers ensures consistent runtime environments across development and production. TensorFlow Serving, TorchServe and Triton Inference Server provide production-grade serving with batching, versioning and A/B testing support. Kubernetes orchestrates scaling, load balancing and health checks for serving deployments.'
            },
            {
              heading: 'Monitoring in production',
              body: 'Models degrade silently as real-world data diverges from training data. Data drift detection compares incoming feature distributions against training baselines using KS tests or population stability index. Concept drift occurs when the relationship between features and targets changes. Monitoring prediction distributions and business metrics alongside model metrics catches degradation before users complain.'
            },
            {
              heading: 'CI/CD for ML',
              description: '',
              body: 'ML pipelines need automated testing beyond unit tests. Data validation checks schema and distribution. Model validation evaluates performance against thresholds. Training reproducibility ensures identical data and code produce identical models. Kubeflow Pipelines, MLflow and GitHub Actions orchestrate these stages so model updates flow from data to production reliably.'
            }
          ],
          links: [
            {
              title: 'TensorFlow Serving Documentation',
              url: 'https://www.tensorflow.org/tfx/guide/serving',
              sourceName: 'TensorFlow',
              resourceType: 'documentation',
              relationship: 'Production model serving with TensorFlow Serving.'
            },
            {
              title: 'Hugging Face Model Hub',
              url: 'https://huggingface.co/docs/hub/index',
              sourceName: 'Hugging Face',
              resourceType: 'documentation',
              relationship: 'Publishing, versioning and sharing trained models.'
            },
            {
              title: 'Hugging Face Transformers Documentation',
              url: 'https://huggingface.co/docs/transformers/index',
              sourceName: 'Hugging Face',
              resourceType: 'documentation',
              relationship: 'Fine-tuning and deploying pre-trained transformer models.'
            }
          ],
          quiz: {
            prompt: 'Data drift is best detected by…',
            options: [
              'Monitoring prediction accuracy alone',
              'Comparing the statistical distribution of incoming features against the training data distribution',
              'Waiting for user complaints',
              'Retraining the model every week regardless'
            ],
            answerIndex: 1,
            explanation:
              'Data drift occurs when the distribution of production inputs diverges from training inputs. Statistical tests like KS or PSI on feature distributions detect this before it impacts model performance.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End ML Pipeline for Churn Prediction',
    coverage: [
      'Data Preprocessing & Feature Engineering',
      'Classical ML with scikit-learn',
      'Deep Learning with PyTorch',
      'Model Evaluation & Comparison',
      'Production Deployment'
    ],
    brief:
      'Build a complete machine learning pipeline that ingests raw customer data, engineers features, trains both a classical model and a neural network, evaluates and compares them, then exports the best model in a servable format with a monitoring baseline.',
    requirements: [
      'Data loading and exploratory analysis with pandas and NumPy',
      'Feature engineering pipeline with scikit-learn Pipeline (scaling, encoding, selection)',
      'Train a scikit-learn model with cross-validated hyperparameter tuning',
      'Train a PyTorch neural network with a custom training loop',
      'Compare both models on a held-out test set using at least three metrics',
      'Export the best model as both SavedModel and ONNX',
      'Generate a data drift baseline report for monitoring'
    ],
    expectedOutput:
      'A complete Python project with source code, Jupyter notebook showing analysis and evaluation, a model comparison report with metrics and an architecture decision record documenting design choices.',
    rubric: [
      { skill: 'Data Preprocessing', weight: 20, criteria: 'Proper handling of missing values, encoding, scaling and train/test splitting with no leakage' },
      { skill: 'Classical ML', weight: 20, criteria: 'Well-tuned scikit-learn model with cross-validation and interpretable feature importance' },
      { skill: 'Deep Learning', weight: 20, criteria: 'Correctly structured PyTorch training loop with logging, validation and early stopping' },
      { skill: 'Evaluation Rigor', weight: 25, criteria: 'Multiple metrics, confusion matrix, ROC analysis and clear model comparison with justification' },
      { skill: 'Deployment & Monitoring', weight: 15, criteria: 'Working model export, correct format and drift baseline with actionable thresholds' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Supervised Learning Benchmark Suite',
      stage: 'Foundation',
      objective:
        'Train and systematically evaluate five different classifiers on the same dataset, comparing performance across metrics and analyzing when each algorithm excels.',
      requirements: [
        'Use at least 5 different scikit-learn classifiers (e.g., logistic regression, SVM, random forest, gradient boosting, KNN)',
        'Apply consistent preprocessing with a Pipeline for each model',
        'Perform stratified 5-fold cross-validation for each classifier',
        'Report accuracy, precision, recall, F1 and ROC AUC in a comparison table',
        'Analyze which models handle class imbalance better and why'
      ],
      skillsEvaluated: [
        'scikit-learn',
        'Model Evaluation & Metrics',
        'Feature Engineering',
        'Python'
      ],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit a Jupyter notebook with preprocessing pipeline, model training code, comparison table and written analysis explaining which models perform best and why.',
        textLabel: 'Model comparison analysis',
        minTextLength: 1000,
        linkLabels: ['Comparison results CSV']
      }
    },
    {
      title: 'PyTorch Image Classifier from Scratch',
      stage: 'Intermediate',
      objective:
        'Build and train a convolutional neural network in PyTorch for image classification, implementing every component of the training loop manually.',
      requirements: [
        'Define a CNN architecture with at least 3 convolutional layers',
        'Implement a custom training loop with forward pass, loss computation, backward pass and optimizer step',
        'Add data augmentation transforms (random flip, rotation, normalization)',
        'Log training and validation metrics per epoch',
        'Save the best model checkpoint based on validation accuracy'
      ],
      skillsEvaluated: [
        'PyTorch',
        'Deep Learning Architecture',
        'Training Loops',
        'Data Augmentation'
      ],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit the PyTorch training script, saved model checkpoint and a training log showing convergence over epochs with written reflection on architecture choices.',
        textLabel: 'Architecture and training report',
        minTextLength: 1200,
        linkLabels: ['Model checkpoint file', 'Training log CSV']
      }
    },
    {
      title: 'TensorFlow Production Deployment',
      stage: 'Advanced',
      objective:
        'Take a trained model, optimize it for serving, package it in a Docker container and write deployment documentation for the engineering team.',
      requirements: [
        'Quantize a TensorFlow model to int8 and measure accuracy degradation',
        'Export in SavedModel and TFLite formats',
        'Write a Dockerfile with TensorFlow Serving configuration',
        'Create a monitoring baseline with feature distribution statistics',
        'Document the deployment process with rollback instructions'
      ],
      skillsEvaluated: [
        'TensorFlow',
        'Model Optimization',
        'Containerization',
        'MLOps'
      ],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit the Dockerfile, quantization comparison report, monitoring baseline notebook and deployment runbook.',
        textLabel: 'Deployment runbook and optimization report',
        minTextLength: 1500,
        linkLabels: ['Dockerfile', 'Quantization report']
      }
    }
  ],

  simTasks: [
    {
      title: 'Model performance collapse after retraining',
      context:
        'A production fraud detection model that was achieving 0.94 AUC has dropped to 0.71 after the weekly retraining pipeline ran. The retrained model replaced the previous version and is now serving live traffic. You need to diagnose and resolve this urgently.',
      requirements: [
        'Compare the training data distribution of this week versus last week for anomalies',
        'Check if the preprocessing pipeline changed or if any feature drift occurred',
        'Validate the retrained model on the previous test set to isolate the issue',
        'Roll back to the previous model version if root cause cannot be fixed quickly'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput:
        'Incident analysis with root cause hypothesis, diagnostic steps taken, rollback decision and preventive measures for the retraining pipeline.',
      skills: [
        'Model Evaluation & Metrics',
        'Data Drift Detection',
        'MLOps',
        'Python'
      ]
    },
    {
      title: 'Scale training to a large dataset',
      context:
        'The data science team has expanded the training dataset from 500K to 50M rows. Their current training script loads everything into memory and runs on a single GPU, taking over 12 hours per epoch. You need to make it practical to train on this data.',
      requirements: [
        'Implement tf.data or PyTorch DataLoader with streaming from disk',
        'Add efficient batching, prefetching and parallel data loading',
        'Implement mixed-precision training to reduce GPU memory usage',
        'Set up checkpointing so training can resume after interruptions',
        'Benchmark and report the new throughput in rows per second'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput:
        'Optimized training pipeline with before/after benchmarks, configuration for distributed training and documentation of the data loading strategy.',
      skills: [
        'PyTorch',
        'TensorFlow',
        'Performance Optimization',
        'MLOps'
      ]
    },
    {
      title: 'Feature pipeline data quality failure',
      context:
        'The feature engineering pipeline that feeds the ML model started producing NaN values in 15% of feature columns due to an upstream database schema change. Models are receiving incomplete feature vectors and returning default predictions.',
      requirements: [
        'Identify which features are affected and why the schema change broke the pipeline',
        'Implement data validation checks that catch missing features before they reach the model',
        'Create an imputation strategy that provides reasonable defaults for affected features',
        'Add alerting so this class of failure is detected within minutes, not hours'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput:
        'Root cause analysis, updated feature pipeline with validation, imputation logic and monitoring alert configuration.',
      skills: [
        'Python',
        'pandas',
        'Feature Engineering',
        'Data Quality'
      ]
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Amara Okafor',
      personaRole: 'Data Scientist',
      situation:
        'Debating whether to use a pre-trained transformer model or train a simpler model from scratch for a text classification task.',
      openingMessage:
        'I want to fine-tune BERT for our sentiment classifier, but you suggested a TF-IDF plus logistic regression approach. The dataset is only 10K labeled examples and inference latency matters because we are in the real-time API path. What is your recommendation?',
      expectedPoints: [
        'Comparing training cost and data requirements for both approaches',
        'Discussing inference latency differences at production scale',
        'Evaluating whether 10K examples are sufficient for meaningful fine-tuning',
        'Suggesting a pragmatic evaluation plan to let data decide'
      ]
    },
    {
      kind: 'team',
      personaName: 'Leo Park',
      personaRole: 'Backend Engineer',
      situation:
        'Integration discussion about how the ML inference service connects to the existing microservice architecture.',
      openingMessage:
        'The product team wants ML predictions to be available through our existing REST API, but the model takes 200ms per inference. The current API has a 100ms p99 SLA. How do we make this work?',
      expectedPoints: [
        'Identifying the latency bottleneck — is it preprocessing, model inference or postprocessing?',
        'Proposing batching, caching or model optimization to meet the SLA',
        'Discussing async inference as an alternative for non-interactive use cases',
        'Providing concrete numbers from benchmarking rather than guesses'
      ]
    },
    {
      kind: 'client',
      personaName: 'Dr. Rachel Kim',
      personaRole: 'VP of Research, Horizon Pharma',
      situation:
        'Client wants to understand if their proprietary clinical trial data can be used to train ML models while maintaining patient privacy.',
      openingMessage:
        'We have 500K de-identified patient records and want to predict treatment response. Our legal team requires that no individual patient can be re-identified from the trained model. What approaches do you recommend?',
      expectedPoints: [
        'Explaining differential privacy and its application to model training',
        'Discussing federated learning as an alternative for data that cannot leave the premises',
        'Addressing regulatory compliance requirements (HIPAA, GDPR) for ML on health data',
        'Proposing a privacy risk assessment before any model training begins'
      ]
    },
    {
      kind: 'client',
      personaName: 'James Whitfield',
      personaRole: 'CTO, RetailEdge',
      situation:
        'Client reports that the demand forecasting model is making predictions that deviate wildly from actual sales during promotional periods.',
      openingMessage:
        'Our demand forecast model was trained on historical sales data, but during Black Friday our predictions were off by 300%. The procurement team ordered too much of some items and ran out of others. What went wrong and how do we fix it?',
      expectedPoints: [
        'Identifying that the training data likely did not include representative promotional periods',
        'Proposing feature engineering to encode promotions, events and seasonal patterns',
        'Suggesting separate model strategies for normal versus promotional periods',
        'Recommending a monitoring framework that detects distribution shift in real time'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation:
        'The ML model serving predictions via TensorFlow Serving started returning significantly higher latency after a routine code deployment, causing API timeouts.',
      requiredActions: [
        {
          action: 'Check if the model file was updated to a larger architecture during deployment',
          good: true,
          note: 'Model size directly impacts inference latency — larger models take longer to load and execute.'
        },
        {
          action: 'Verify GPU memory availability and whether other services are competing for GPU resources',
          good: true,
          note: 'GPU memory contention from co-located services causes context switching and latency spikes.'
        },
        {
          action: 'Roll back to the previous model version while profiling the new model offline',
          good: true,
          note: 'Restore service first; root cause analysis is a parallel activity, not a prerequisite.'
        },
        {
          action: 'Increase the API timeout from 100ms to 500ms as a permanent fix',
          good: false,
          note: 'Increasing the timeout masks the symptom without addressing the root cause and degrades user experience.'
        }
      ]
    },
    {
      category: 'Requirement change',
      situation:
        'Midway through building a recommendation model, the product team changes the success metric from click-through rate to conversion rate, which fundamentally alters what the model should optimize for.',
      requiredActions: [
        {
          action: 'Re-evaluate the feature set — click-based features may be less relevant for conversion prediction',
          good: true,
          note: 'Different objectives require different signals. Conversion may depend on price, cart value and historical purchase behavior.'
        },
        {
          action: 'Assess whether the available labels are sufficient — conversion events are rarer than clicks',
          good: true,
          note: 'Low conversion rates mean fewer positive labels, which affects class balance and model training strategy.'
        },
        {
          action: 'Redefine the evaluation metrics to match the new objective (precision@k for conversions, not CTR)',
          good: true,
          note: 'Evaluation must align with the business objective to produce a useful model.'
        },
        {
          action: 'Proceed with the original click-based model and optimize for conversion in a second iteration',
          good: false,
          note: 'Building a model optimized for the wrong objective wastes training time and infrastructure costs.'
        }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between bagging and boosting in ensemble methods. When would you choose one over the other?',
      guidancePoints: [
        'Bagging trains base learners independently on random subsets and averages predictions — reduces variance',
        'Boosting trains learners sequentially, with each correcting the errors of the previous — reduces bias',
        'Random Forest uses bagging with decision trees, Gradient Boosting uses boosting',
        'Bagging is more resistant to overfitting; boosting can overfit if iterations are excessive',
        'Boosting often achieves higher accuracy but requires more careful tuning'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the vanishing gradient problem and how do modern architectures address it?',
      guidancePoints: [
        'Gradients shrink exponentially as they propagate backward through many layers',
        'Sigmoid and tanh activations are particularly susceptible due to their small derivative ranges',
        'ReLU activations maintain a constant gradient for positive inputs, mitigating the problem',
        'Residual connections (skip connections) in ResNets provide gradient shortcuts',
        'Batch normalization stabilizes activations across layers'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You have a dataset with 200 features but only 1,000 training samples. Your model overfits badly. Walk through your approach.',
      guidancePoints: [
        'High dimensionality relative to sample size is a classic overfitting scenario',
        'Apply dimensionality reduction — PCA, feature selection with mutual information or L1 regularization',
        'Use simpler models with strong regularization (Ridge, Lasso) before complex models',
        'Cross-validation to get honest performance estimates with so few samples',
        'Consider whether additional labeled data is obtainable to improve the sample-to-feature ratio'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A PyTorch model trains correctly on GPU but gives different predictions when loaded on CPU for inference. What might be wrong?',
      guidancePoints: [
        'Floating-point arithmetic differs between GPU and CPU implementations',
        'Check if model.eval() is called — dropout and batch normalization behave differently in train mode',
        'Verify that tensor dtypes match — GPU models often use float16 while CPU inference expects float32',
        'Ensure the same random seeds are set if deterministic output is required',
        'Compare predictions element-by-element to identify where divergence occurs'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your manager asks you to build a recommendation model using a deep learning approach, but the dataset has only 5K users and 20K interactions. How do you respond?',
      guidancePoints: [
        'Assess whether the dataset is large enough to justify deep learning over simpler collaborative filtering',
        'Matrix factorization (ALS, SVD) often outperforms deep models on small datasets',
        'Deep models require careful regularization and validation to avoid memorization on small data',
        'Propose starting with a simple baseline and only increasing complexity if justified by metrics',
        'Consider hybrid approaches — content-based features can supplement sparse interaction data'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When should you choose PyTorch over TensorFlow for a new ML project? Consider trade-offs.',
      guidancePoints: [
        'PyTorch is preferred in research environments due to Pythonic design and dynamic computation graphs',
        'TensorFlow has stronger production tooling — TFX, TF Serving, TF Lite for mobile deployment',
        'PyTorch with TorchServe or ONNX export has narrowed the production deployment gap',
        'Team expertise matters — choosing the framework your team knows well reduces risk',
        'Consider the target deployment environment — TensorFlow Lite dominates mobile/edge'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain the bias-variance trade-off to a product manager who does not have a technical background.',
      guidancePoints: [
        'Use a simple analogy — bias is like being consistently wrong in the same direction, variance is like being unpredictably scattered',
        'Explain that a simple model might miss patterns (high bias) while a complex model might chase noise (high variance)',
        'Connect to business impact — too simple means missed opportunities, too complex means unreliable predictions',
        'Describe practical implications — we need enough data and the right model complexity to find the sweet spot'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your team deployed a model that performs well on offline metrics but users report it feels unreliable in production. How do you investigate and communicate findings?',
      guidancePoints: [
        'Gather specific examples of failures from user reports — what inputs cause what outputs?',
        'Compare offline evaluation data distribution with production data distribution',
        'Check for data drift — has the input data changed since the model was trained?',
        'Present findings with concrete examples, not just aggregate metrics',
        'Recommend a monitoring solution and retraining cadence based on evidence'
      ]
    }

  ]

}

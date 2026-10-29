import type { CareerDef } from '../framework.js'

export const dataScientist: CareerDef = {
  slug: 'data-scientist',
  name: 'Data Scientist',
  category: 'AI & Data',
  order: 19,
  description:
    'Turns raw data into decisions with Python, statistics, EDA, visualization and machine learning — then communicates results.',
  difficulty: 'Intermediate',
  pathSummary:
    'Python data fundamentals & statistics → exploratory data analysis & visualization → machine learning with scikit-learn → model evaluation & communication of results back to stakeholders.',
  mainSkills: [
    'Python for Data Science',
    'NumPy & pandas',
    'Statistical Analysis',
    'Exploratory Data Analysis',
    'Data Visualization (Matplotlib)',
    'Machine Learning (scikit-learn)',
    'Model Evaluation',
    'Business Communication'
  ],
  sourcePlatforms: [
    'Python Documentation',
    'NumPy',
    'pandas',
    'scikit-learn',
    'Jupyter Documentation',
    'Matplotlib Documentation'
  ],
  companyName: 'InsightLoop Analytics',
  roleTitle: 'Data Scientist',

  chapters: [
    {
      slug: 'python-stats-foundations',
      stage: 'Beginner',
      title: 'Python & Statistics Foundations',
      description: 'The Python and statistics fundamentals every data scientist must internalize before touching models.',
      topics: [
        {
          slug: 'python-data-science-essentials',
          title: 'Python for Data Science',
          minutes: 30,
          objectives: [
            'Write clean, reproducible Python using functions and modules',
            'Manipulate collections with comprehensions and built-in data structures',
            'Use Jupyter notebooks for iterative exploration and documentation'
          ],
          sections: [
            { heading: 'Python as the data science workhorse', body: 'Every major data stack — pandas, NumPy, scikit-learn — exposes a Python API first. Beyond libraries, writing clean, typed, well-structured Python keeps analysis reproducible and auditable as notebooks evolve into production scripts. Context managers, f-strings and clear function signatures are everyday essentials.' },
            { heading: 'Structuring code for analysis', body: 'Comprehensions transform and filter data concisely, dicts map feature names to values, and modules keep analysis logic reusable. A data scientist ships many small, verifiable pieces of code rather than one sprawling script, which is what makes findings auditable by peers.' },
            { heading: 'Jupyter as the analysis canvas', body: 'Jupyter notebooks combine live code, markdown narrative and visual output in one artifact. They are ideal for exploration: iterate quickly on hypotheses, document reasoning inline, and export results for stakeholders. Use clear cell organization and deterministic seeds to keep notebooks reproducible.' }
          ],
          links: [
            { title: 'The Python Tutorial', url: 'https://docs.python.org/3/tutorial/', sourceName: 'Python Documentation', resourceType: 'tutorial', relationship: 'Official language introduction and syntax reference.' },
            { title: 'Jupyter Documentation', url: 'https://jupyter.org/documentation', sourceName: 'Jupyter Documentation', resourceType: 'documentation', relationship: 'Official docs for installing, running and extending Jupyter notebooks and Lab.' },
            { title: 'Data Structures in Python', url: 'https://docs.python.org/3/tutorial/datastructures.html', sourceName: 'Python Documentation', resourceType: 'guide', relationship: 'Lists, dicts, sets and comprehension patterns used constantly in data pipelines.' }
          ],
          quiz: {
            prompt: 'Why are Jupyter notebooks well suited to exploratory data analysis?',
            options: [
              'They compile to native binaries for speed',
              'They combine code, narrative text and visual output in one reproducible artifact',
              'They automatically clean messy data',
              'They run without a Python interpreter'
            ],
            answerIndex: 1,
            explanation: 'Interleaving live code, markdown explanations and visualizations makes Jupyter ideal for iterating on hypotheses while documenting reasoning inline.'
          }
        },
        {
          slug: 'descriptive-statistics',
          title: 'Descriptive Statistics',
          minutes: 30,
          objectives: [
            'Compute and interpret measures of central tendency and spread',
            'Describe distributions using shape, skew and outliers',
            'Summarize categorical and numerical variables correctly'
          ],
          sections: [
            { heading: 'Measures of central tendency and spread', body: 'The mean, median and mode summarize where data clusters, while variance, standard deviation and the interquartile range quantify spread. Choosing the right measure matters: a skewed distribution can make the mean misleading, which is why the median is often preferred for income or response-time data.' },
            { heading: 'Shape of a distribution', body: 'Histograms and box plots reveal skew, modality and outliers that summary numbers hide. Understanding the distribution\'s shape drives which statistical tests and preprocessing steps are appropriate — which is why descriptive statistics always comes before modeling.' },
            { heading: 'Categorical versus numerical summary', body: 'Numerical variables are summarized with mean, median and percentile-based spread. Categorical variables are summarized with counts, proportions and mode. Mixing them — for example averaging a category label — produces meaningless outputs. Getting this basic distinction right prevents downstream modeling errors.' }
          ],
          links: [
            { title: 'NumPy Statistical Functions', url: 'https://numpy.org/doc/stable/reference/routines.statistics.html', sourceName: 'NumPy', resourceType: 'reference', relationship: 'NumPy functions for mean, median, variance, percentile and more.' },
            { title: 'pandas Descriptive Statistics', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'Powerful descriptive summary methods like describe(), value_counts() and groupby().' },
            { title: 'Python statistics Module', url: 'https://docs.python.org/3/library/statistics.html', sourceName: 'Python Documentation', resourceType: 'reference', relationship: 'Standard-library statistical functions for small datasets.' }
          ],
          quiz: {
            prompt: 'Income data is heavily right-skewed with a few millionaires. Which measure best summarizes a "typical" value?',
            options: [
              'The mean',
              'The median',
              'The standard deviation',
              'The mode'
            ],
            answerIndex: 1,
            explanation: 'Skew pulls the mean upward. The median, being robust to outliers, better represents a typical value in skewed distributions.'
          }
        },
        {
          slug: 'prob-inferential-statistics',
          title: 'Probability & Inferential Statistics',
          minutes: 30,
          objectives: [
            'Reason with probability, distributions and sampling',
            'Apply the central limit theorem and confidence intervals',
            'Run and interpret hypothesis tests with p-values'
          ],
          sections: [
            { heading: 'Probability and distributions', body: 'Probability quantifies uncertainty, and common distributions — normal, binomial, Poisson — describe how real-world phenomena behave. Recognizing which distribution fits your data tells you which statistical machinery to apply, from z-scores to chi-square tests.' },
            { heading: 'From samples to inference', body: 'Rather than measuring an entire population, you infer from a sample. The central limit theorem says sample means approach a normal distribution as sample size grows, which powers confidence intervals and lets you quantify how precise an estimate is.' },
            { heading: 'Hypothesis testing and p-values', body: 'A hypothesis test asks whether observed data is unlikely under a null assumption. The p-value is the probability of seeing results this extreme if the null were true. A small p-value suggests rejecting the null — but p-values are frequently over-trusted, so always consider effect size and practical significance.' }
          ],
          links: [
            { title: 'Python statistics Module', url: 'https://docs.python.org/3/library/statistics.html', sourceName: 'Python Documentation', resourceType: 'reference', relationship: 'Statistical functions including normal distribution and variance tools.' },
            { title: 'NumPy Random Sampling', url: 'https://numpy.org/doc/stable/reference/random/index.html', sourceName: 'NumPy', resourceType: 'reference', relationship: 'Random generators for simulating distributions and sampling experiments.' },
            { title: 'pandas GroupBy', url: 'https://pandas.pydata.org/docs/reference/groupby.html', sourceName: 'pandas', resourceType: 'reference', relationship: 'GroupBy operations to compute group-wise statistics for tests.' }
          ],
          quiz: {
            prompt: 'A p-value of 0.03 in a hypothesis test means…',
            options: [
              'There is a 3% chance the null hypothesis is true',
              'There is a 3% chance of observing results this extreme if the null were true',
              'The result is definitely practically significant',
              'You must reject the null with certainty'
            ],
            answerIndex: 1,
            explanation: 'The p-value describes the probability of the data under the null — it does not represent the probability that the null itself is true, and significance is not the same as practical importance.'
          }
        }
      ]
    },
    {
      slug: 'eda-data-wrangling',
      stage: 'Foundation',
      title: 'Data Wrangling & Exploratory Analysis',
      description: 'Loading, cleaning and exploring real datasets with pandas, and communicating findings through visualizations.',
      topics: [
        {
          slug: 'numpy-arrays-vectorization',
          title: 'NumPy Arrays & Vectorization',
          minutes: 30,
          objectives: [
            'Create and reshape NumPy arrays for numerical work',
            'Apply vectorized operations and broadcasting',
            'Perform fast array math for preprocessing and feature engineering'
          ],
          sections: [
            { heading: 'Arrays as the numerical backbone', body: 'NumPy\'s ndarray is the fundamental data structure for numerical Python. It stores homogeneous typed data in contiguous memory, enabling fast vectorized operations that run in optimized C. Almost every data science library — pandas, scikit-learn, Matplotlib — is built on NumPy arrays.' },
            { heading: 'Vectorization and broadcasting', body: 'Vectorized operations apply an expression to an entire array without explicit loops, which is dramatically faster and cleaner than Python iteration. Broadcasting lets NumPy combine arrays of different shapes by aligning dimensions, enabling things like subtracting a column mean from every row in one expression.' },
            { heading: 'From arrays to analysis', body: 'Compute aggregates (mean, sum, max), reshape with reshape() and transpose, and combine arrays with concatenation. These operations underpin feature scaling, normalization and matrix-style data transforms that prepare data for modeling.' }
          ],
          links: [
            { title: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', sourceName: 'NumPy', resourceType: 'tutorial', relationship: 'Essential array creation, indexing and operation patterns.' },
            { title: 'NumPy Broadcasting Guide', url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html', sourceName: 'NumPy', resourceType: 'guide', relationship: 'How broadcasting aligns array shapes in vectorized operations.' },
            { title: 'NumPy User Guide', url: 'https://numpy.org/doc/stable/user/index.html', sourceName: 'NumPy', resourceType: 'reference', relationship: 'Comprehensive reference for NumPy array operations.' }
          ],
          quiz: {
            prompt: 'Array a has shape (4,3) and b has shape (3,). Adding a + b succeeds due to…',
            options: [
              'Automatic type coercion to float',
              'Broadcasting, which aligns b\'s trailing dimension with a\'s last axis',
              'Implicit reshaping of b to (4,3)',
              'A runtime error requiring explicit loops'
            ],
            answerIndex: 1,
            explanation: 'NumPy broadcasting aligns the trailing dimension: b is stretched across each row of a, applying the vector operation element-wise to all columns.'
          }
        },
        {
          slug: 'pandas-dataframes',
          title: 'pandas DataFrames & Wrangling',
          minutes: 30,
          objectives: [
            'Load tabular data and inspect its structure and types',
            'Filter, reshape and merge datasets with pandas idioms',
            'Handle missing values and clean inconsistent data'
          ],
          sections: [
            { heading: 'The DataFrame as a working unit', body: 'A pandas DataFrame is a labeled, two-dimensional structure of rows and columns ideal for tabular data. Loading from CSV, Excel or a database is one call; inspecting with .head(), .info() and .describe() gives an instant picture of data shape, types and missing values before any analysis.' },
            { heading: 'Cleaning and reshaping', body: 'Real data arrives messy: missing cells, duplicate rows, inconsistent categories and mixed types. Handling missing values (drop vs fill), standardizing categorical values with .map() or .replace(), and reshaping with groupby, pivot and merge are the daily work of a data scientist. Clean data is the prerequisite for trustworthy analysis.' },
            { heading: 'Filtering and selecting', body: 'Boolean masks select rows by condition, .loc[] and .iloc[] select by label and position, and column selection via .filter() selects columns by name. These selection idioms, combined with groupby-aggregate, let you slice the exact view of data a question demands.' }
          ],
          links: [
            { title: '10 Minutes to Pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', sourceName: 'pandas', resourceType: 'tutorial', relationship: 'Rapid introduction to DataFrame construction, selection and aggregation.' },
            { title: 'pandas User Guide', url: 'https://pandas.pydata.org/docs/user_guide/index.html', sourceName: 'pandas', resourceType: 'reference', relationship: 'Comprehensive documentation for data manipulation patterns.' },
            { title: 'pandas Handling Missing Data', url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html', sourceName: 'pandas', resourceType: 'guide', relationship: 'How to identify and handle missing values in DataFrames.' }
          ],
          quiz: {
            prompt: 'Which pandas operation is the right tool to add a summary column to each group of a DataFrame?',
            options: [
              'merge()',
              'groupby() followed by transform()',
              'concat()',
              'pivot_table() only'
            ],
            answerIndex: 1,
            explanation: 'groupby().transform() computes a statistic within each group and broadcasts it back to the original rows, which is exactly how you add group-wise summaries without collapsing the DataFrame.'
          }
        },
        {
          slug: 'eda-visualization',
          title: 'Exploratory Data Analysis & Visualization',
          minutes: 30,
          objectives: [
            'Profile datasets to surface anomalies, gaps and relationships',
            'Build a reproducible EDA workflow in Jupyter',
            'Produce clear visualizations with Matplotlib that drive decisions'
          ],
          sections: [
            { heading: 'The EDA mindset', body: 'EDA is systematic discovery before modeling: checking ranges, distributions, correlations and anomalies to understand the data deeply and surface potential issues. It generates the hypotheses a model will later test, so skipping a thorough EDA means modeling blind.' },
            { heading: 'A reproducible EDA workflow', body: 'Start with an overall profile (shape, types, missing counts), then examine each variable\'s distribution, then explore relationships between variables and the target. Working in Jupyter with clear section headers, deterministic seeds and documented assumptions keeps the process reproducible and shareable with collaborators.' },
            { heading: 'Visualizing with Matplotlib', body: 'Matplotlib is the foundational plotting library. Histograms and box plots reveal distributions; scatter plots reveal relationships; bar charts summarize categorical data. Well-labeled, well-titled figures that stand alone are the difference between a chart and a compelling finding. Combine Matplotlib with seaborn-style thinking for rapid exploration.' }
          ],
          links: [
            { title: 'Matplotlib Pyplot Tutorial', url: 'https://matplotlib.org/stable/tutorials/pyplot.html', sourceName: 'Matplotlib Documentation', resourceType: 'tutorial', relationship: 'Getting started with matplotlib.pyplot for basic plotting.' },
            { title: 'Matplotlib Usage Guide', url: 'https://matplotlib.org/stable/tutorials/introductory/usage.html', sourceName: 'Matplotlib Documentation', resourceType: 'guide', relationship: 'Core concepts for building and customizing figures and axes.' },
            { title: 'Matplotlib Gallery', url: 'https://matplotlib.org/stable/gallery/index.html', sourceName: 'Matplotlib Documentation', resourceType: 'reference', relationship: 'A huge gallery of example plots with source code to adapt.' }
          ],
          quiz: {
            prompt: 'Which plot best reveals the shape and outliers of a single numerical variable?',
            options: [
              'A bar chart',
              'A box plot or histogram',
              'A line plot',
              'A scatter plot matrix'
            ],
            answerIndex: 1,
            explanation: 'Box plots and histograms directly show a variable\'s distribution, spread and outliers — the key features you want to inspect during EDA.'
          }
        }
      ]
    },
    {
      slug: 'ml-scikit-learn',
      stage: 'Intermediate',
      title: 'Machine Learning with scikit-learn',
      description: 'Building, training and evaluating supervised and unsupervised models with the scikit-learn ecosystem.',
      topics: [
        {
          slug: 'sklearn-overview-supervised',
          title: 'Machine Learning Fundamentals',
          minutes: 30,
          objectives: [
            'Distinguish supervised and unsupervised learning paradigms',
            'Explain the bias-variance trade-off and data splits',
            'Choose appropriate evaluation metrics for regression and classification'
          ],
          sections: [
            { heading: 'The learning paradigms', body: 'Supervised learning maps features to known labels — classification assigns categories while regression predicts continuous values. Unsupervised learning finds structure in unlabeled data through clustering and dimensionality reduction. Choosing the right paradigm for the business question is the first modeling decision.' },
            { heading: 'Bias-variance and generalization', body: 'Data is split into training, validation and test sets to estimate how well a model generalizes. The bias-variance trade-off describes the tension between models that are too simple (high bias, underfit) and too complex (high variance, overfit). Cross-validation provides a more robust estimate of performance than a single split.' },
            { heading: 'Choosing evaluation metrics', body: 'Accuracy alone can mislead, especially on imbalanced classes. For regression, use metrics like mean squared error and R-squared. For classification, precision, recall, F1 and the ROC-AUC give a fuller picture. The right metric depends on the real cost of false positives versus false negatives.' }
          ],
          links: [
            { title: 'scikit-learn Getting Started', url: 'https://scikit-learn.org/stable/getting_started.html', sourceName: 'scikit-learn', resourceType: 'tutorial', relationship: 'Official introduction to the library\'s core API and workflow.' },
            { title: 'scikit-learn Choosing the Right Estimator', url: 'https://scikit-learn.org/stable/tutorial/machine_learning_map/', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'A decision flow map for picking the right estimator for your task.' },
            { title: 'scikit-learn Model Evaluation', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Documentation on scoring metrics, cross-validation and model selection.' }
          ],
          quiz: {
            prompt: 'A model gets 98% accuracy on a dataset where 98% of samples belong to one class. The accuracy is…',
            options: [
              'Proof the model is excellent',
              'Misleading because of class imbalance — precision or recall would be more informative',
              'Always the correct metric regardless of class balance',
              'Low, indicating the model is broken'
            ],
            answerIndex: 1,
            explanation: 'Trivially predicting the majority class yields high accuracy on imbalanced data. Metrics like precision, recall and F1 reveal whether the rare but important class is actually being detected.'
          }
        },
        {
          slug: 'classification-regression-models',
          title: 'Classification & Regression with scikit-learn',
          minutes: 30,
          objectives: [
            'Build linear models for regression and logistic regression for classification',
            'Apply tree-based models including random forests',
            'Tune hyperparameters with grid search and cross-validation'
          ],
          sections: [
            { heading: 'Linear and tree-based models', body: 'Linear regression captures additive relationships, while logistic regression produces probabilistic classification. Random forests and decision trees model non-linear interactions and feature importance without much tuning. Starting simple — a baseline linear model — before reaching for complex trees is best practice for interpretability.' },
            { heading: 'The scikit-learn workflow', body: 'scikit-learn standardizes modeling around fit() and predict(): instantiate an estimator, fit it on training data, then evaluate on held-out data. Pipelines chain preprocessing and model steps into one object, preventing data leakage and making the whole workflow reproducible and deployable.' },
            { heading: 'Hyperparameter tuning', body: 'Hyperparameters — like a tree\'s max depth or a forest\'s number of estimators — control model complexity. GridSearchCV and RandomizedSearchCV combine cross-validation with parameter search to find good values. Tuning too aggressively on the test set causes leakage, so tune on validation folds only.' }
          ],
          links: [
            { title: 'scikit-learn Linear Models', url: 'https://scikit-learn.org/stable/modules/linear_model.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Documentation for linear and logistic regression models.' },
            { title: 'scikit-learn Ensemble Methods', url: 'https://scikit-learn.org/stable/modules/ensemble.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Random forests, gradient boosting and other ensemble techniques.' },
            { title: 'scikit-learn Cross-Validation', url: 'https://scikit-learn.org/stable/modules/cross_validation.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Cross-validation strategies and grid search for model selection.' }
          ],
          quiz: {
            prompt: 'Which scikit-learn feature prevents data leakage by combining preprocessing and modeling into one object?',
            options: [
              'StandardScaler',
              'Pipeline',
              'GridSearchCV',
              'cross_val_score'
            ],
            answerIndex: 1,
            explanation: 'A Pipeline chains a sequence of transforms and a final estimator, so the same preprocessing is applied inside cross-validation folds — preventing the model from seeing validation information.'
          }
        },
        {
          slug: 'feature-engineering-clustering',
          title: 'Feature Engineering & Unsupervised Learning',
          minutes: 25,
          objectives: [
            'Create and select predictive features from raw data',
            'Scale and encode variables for modeling',
            'Apply clustering to discover natural groups in data'
          ],
          sections: [
            { heading: 'Feature engineering', body: 'Features are the model\'s raw material. Creating derived features — date parts, interaction terms, aggregations — from domain knowledge often matters more than model choice. Selecting the most predictive features reduces overfitting and runtime while keeping models interpretable.' },
            { heading: 'Preprocessing for models', body: 'Most algorithms assume standardized, numeric inputs. StandardScaler and MinMaxScaler normalize ranges, while OneHotEncoder and LabelEncoder convert categorical values to usable form. Applying these consistently inside a pipeline ensures the same transforms reach training and inference.' },
            { heading: 'Clustering for structure', body: 'When there is no target label, clustering reveals structure. K-means partitions data into k groups; hierarchical clustering builds nested groupings. Evaluating clusters with silhouette score and domain judgment helps decide whether found groups are meaningful — commonly used for customer segmentation and anomaly exploration.' }
          ],
          links: [
            { title: 'scikit-learn Preprocessing', url: 'https://scikit-learn.org/stable/modules/preprocessing.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Scaling, encoding and normalization transforms for features.' },
            { title: 'scikit-learn Feature Selection', url: 'https://scikit-learn.org/stable/modules/feature_selection.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Techniques for selecting the most predictive features.' },
            { title: 'scikit-learn Clustering', url: 'https://scikit-learn.org/stable/modules/clustering.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'K-means, hierarchical and other clustering algorithms and their usage.' }
          ],
          quiz: {
            prompt: 'A model trained on unscaled features performs poorly because one feature spans 0–1 while another spans 0–100,000. The fix is…',
            options: [
              'Removing the large-magnitude feature',
              'Standardizing or scaling features so no single one dominates distance-based methods',
              'Increasing the number of trees',
              'Using a higher learning rate'
            ],
            answerIndex: 1,
            explanation: 'Distance-based algorithms and regularization are sensitive to feature scale. Scaling features so each contributes comparably prevents one variable from dominating the computation.'
          }
        }
      ]
    },
    {
      slug: 'model-eval-communication',
      stage: 'Advanced',
      title: 'Model Evaluation & Business Communication',
      description: 'Rigorously validating models and translating technical results into decisions stakeholders actually act on.',
      topics: [
        {
          slug: 'model-validation-regression',
          title: 'Model Validation & Error Analysis',
          minutes: 30,
          objectives: [
            'Compare models with cross-validation and proper baselines',
            'Analyze errors to identify systemic failure patterns',
            'Guard against overfitting, leakage and data drift'
          ],
          sections: [
            { heading: 'Validating and comparing models', body: 'Cross-validation provides robust, low-variance estimates of model performance. Comparing a candidate model to a sensible baseline — a majority-class classifier or mean predictor — shows whether it adds real value. Reports should state uncertainty, not just a single accuracy number.' },
            { heading: 'Error analysis', body: 'Look beyond aggregate metrics at where a model fails. A confusion matrix, or examining misclassified examples by segment (region, customer tier, time period), often reveals systemic patterns — a feature that is missing, noisy or biased for one group. Error analysis directs where the next round of improvement should focus.' },
            { heading: 'Leakage, drift and robustness', body: 'Data leakage — target information accidentally leaking into features — inflates performance that vanishes in production. Model drift means performance degrades as real-world data shifts. Monitoring feature distributions and model scores over time, and periodically retraining, keeps deployed models honest.' }
          ],
          links: [
            { title: 'scikit-learn Model Evaluation', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Scoring metrics, cross-validation and unbiased model evaluation.' },
            { title: 'scikit-learn Confusion Matrix', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html', sourceName: 'scikit-learn', resourceType: 'reference', relationship: 'Reference for generating and interpreting confusion matrices.' },
            { title: 'scikit-learn Validation Curves', url: 'https://scikit-learn.org/stable/modules/learning_curve.html', sourceName: 'scikit-learn', resourceType: 'guide', relationship: 'Learning curves and validation curves to diagnose bias-variance problems.' }
          ],
          quiz: {
            prompt: 'Validation performance is excellent but a model fails in production. The most likely cause is…',
            options: [
              'The model is too large',
              'Data leakage or a mismatch between training data and real-world data (drift)',
              'The test set was too small to be trusted',
              'Overfitting is actually impossible with cross-validation'
            ],
            answerIndex: 1,
            explanation: 'A gap between validation and production performance usually means information leaked into training features, or the real-world distribution drifted from what the model learned on.'
          }
        },
        {
          slug: 'storytelling-visualization',
          title: 'Storytelling with Data',
          minutes: 25,
          objectives: [
            'Design charts that answer a question rather than decorate a page',
            'Choose the right visualization for the message',
            'Build a data narrative that leads stakeholders to a decision'
          ],
          sections: [
            { heading: 'Visualization with purpose', body: 'The best chart answers one clear question. Choosing the right visual — scatter for relationships, bar for comparison, line for trends, histogram for distributions — and de-cluttering the figure (labeled axes, clear titles, minimal decoration) makes the message obvious at a glance.' },
            { heading: 'Crafting a data narrative', body: 'A strong data story moves from context to finding to recommendation. Frame with the business problem, present the evidence through clean visuals and metrics, and end with an explicit recommendation and expected impact. The narrative is what turns analysis into action.' },
            { heading: 'Presenting uncertainty honestly', body: 'Confidence intervals, error bars and honest caveats build credibility. Showing what is uncertain — not just the point estimate — prevents stakeholders from over-trusting a model. Clear framing of assumptions and limitations is a hallmark of a senior data scientist.' }
          ],
          links: [
            { title: 'Matplotlib Bar/Line Chart Tutorial', url: 'https://matplotlib.org/stable/plot_types/index.html', sourceName: 'Matplotlib Documentation', resourceType: 'tutorial', relationship: 'Plot type overview for choosing the right chart for your data.' },
            { title: 'Matplotlib Tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html', sourceName: 'Matplotlib Documentation', resourceType: 'tutorial', relationship: 'Tutorials on labeling, axes, styling and figure composition.' },
            { title: 'Matplotlib Examples', url: 'https://matplotlib.org/stable/gallery/index.html', sourceName: 'Matplotlib Documentation', resourceType: 'reference', relationship: 'Gallery of real plot examples with code you can adapt to your data.' }
          ],
          quiz: {
            prompt: 'The clearest chart for comparing sales across five product categories is…',
            options: [
              'A histogram',
              'A bar chart',
              'A scatter plot',
              'A box plot'
            ],
            answerIndex: 1,
            explanation: 'Bar charts are ideal for comparing discrete categories against a common baseline, making differences between categories immediately apparent.'
          }
        },
        {
          slug: 'collaboration-communication',
          title: 'Collaborating with Stakeholders',
          minutes: 30,
          objectives: [
            'Translate business questions into concrete data analysis tasks',
            'Communicate results to non-technical audiences clearly',
            'Give and receive feedback on analyses and models'
          ],
          sections: [
            { heading: 'From business question to analysis', body: 'A stakeholder asks "why are we losing customers?" — the data scientist translates that into a concrete task: define churn, choose features, build a predictive or descriptive model, and frame results as actionable findings. Clarifying success criteria up front prevents wasted effort on the wrong analysis.' },
            { heading: 'Communicating with non-technical audiences', body: 'Avoid unexplained jargon like p-values and ROC-AUC when presenting to leadership. Lead with the business impact, describe results in plain language, and support claims with clean, self-explanatory visuals. The goal is a decision, not a statistics lecture.' },
            { heading: 'Handling pushback and feedback', body: 'Stakeholders often question model outputs or push for faster results. Respond with evidence, reframe limitations honestly, and set realistic expectations about what data can and cannot prove. Iterating on feedback — refining questions and assumptions — is a normal, valuable part of the process.' }
          ],
          links: [
            { title: 'NumPy Array Operations', url: 'https://numpy.org/doc/stable/user/quickstart.html', sourceName: 'NumPy', resourceType: 'tutorial', relationship: 'Reusable array math for building and verifying analysis outputs.' },
            { title: 'pandas User Guide', url: 'https://pandas.pydata.org/docs/user_guide/index.html', sourceName: 'pandas', resourceType: 'reference', relationship: 'Data preparation patterns for producing clean, shareable result tables.' },
            { title: 'Matplotlib Tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html', sourceName: 'Matplotlib Documentation', resourceType: 'tutorial', relationship: 'Charting practices for building stakeholder-facing visuals.' }
          ],
          quiz: {
            prompt: 'A product manager asks why the churn model "made an error." The best response is…',
            options: [
              'Explain the model is imperfect and refuse to elaborate',
              'Look at the specific case, explain the model\'s reasoning and any data limitations, and describe when the model is and is not reliable',
              'Delete the model',
              'Blame the data team'
            ],
            answerIndex: 1,
            explanation: 'Addressing a specific example transparently builds trust. Explaining the reasoning, data limitations and the model\'s reliability boundaries turns a complaint into a learning opportunity.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Customer Churn Prediction Project',
    coverage: [
      'Data Wrangling with pandas',
      'Exploratory Data Analysis',
      'Data Visualization with Matplotlib',
      'Machine Learning with scikit-learn',
      'Model Evaluation & Communication'
    ],
    brief:
      'Analyze a customer churn dataset end-to-end: clean and explore the data, build and evaluate a model that predicts which customers will churn, identify the strongest churn drivers, and present your findings as a decision-ready report for the business.',
    requirements: [
      'Load and clean the dataset, documenting every data-quality decision made',
      'Profile the data with EDA, including distributions and missing-value handling',
      'Build at least two visualizations that directly support your analysis',
      'Train and compare a baseline and at least one tuned model with cross-validation',
      'Evaluate with an appropriate metric for the churn context, not raw accuracy alone',
      'Compute feature importance to identify the top churn drivers',
      'Write a final report that concludes with a clear, actionable business recommendation'
    ],
    expectedOutput:
      'A reproducible Jupyter notebook plus a written report that presents the model\'s performance, the key churn drivers with supporting visuals, and a concrete recommendation the business can act on.',
    rubric: [
      { skill: 'Data Wrangling & EDA', weight: 25, criteria: 'Clean, well-documented data pipeline; thorough exploration that surfaces meaningful patterns' },
      { skill: 'Modeling & Evaluation', weight: 25, criteria: 'Appropriate baseline and models, correct metric choice, rigorous cross-validation' },
      { skill: 'Feature Insight', weight: 15, criteria: 'Clear identification and interpretation of the strongest churn drivers' },
      { skill: 'Visualization', weight: 15, criteria: 'Clear, labeled visuals that directly support the findings' },
      { skill: 'Communication', weight: 20, criteria: 'Report translates technical results into a concrete, well-reasoned business recommendation' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Descriptive Analytics Report',
      stage: 'Beginner',
      objective: 'Load a real dataset and produce a rigorous descriptive analysis of its key variables using statistics, EDA and visualization.',
      requirements: [
        'Load a dataset with both numerical and categorical variables',
        'Compute and interpret measures of central tendency and spread for numerical variables',
        'Summarize categorical variables with counts and proportions',
        'Create at least three visualizations that reveal the data\'s shape and relationships',
        'Write a narrative report that answers three questions about the data'
      ],
      skillsEvaluated: ['pandas', 'Descriptive Statistics', 'Matplotlib', 'Data Wrangling'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit a Jupyter notebook with your analysis and a written report connecting each finding to the relevant statistics and charts.',
        textLabel: 'Analytics report',
        minTextLength: 1000,
        linkLabels: ['Dataset used']
      }
    },
    {
      title: 'Churn Modeling with scikit-learn',
      stage: 'Intermediate',
      objective: 'Build, tune and rigorously evaluate a machine learning model that predicts customer churn, comparing it against a strong baseline.',
      requirements: [
        'Define the churn task and select an appropriate evaluation metric',
        'Preprocess features with scaling and encoding inside a pipeline',
        'Train a baseline model and at least one tuned model using cross-validation',
        'Report precision, recall, F1 and ROC-AUC with interpretation',
        'Present feature importance and its business meaning'
      ],
      skillsEvaluated: ['scikit-learn', 'Model Evaluation', 'Feature Engineering', 'Pipelines'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit your modeling notebook plus a written analysis comparing the models and explaining the metric choice and its business relevance.',
        textLabel: 'Modeling report',
        minTextLength: 1200,
        linkLabels: ['Cross-validation results']
      }
    },
    {
      title: 'Customer Segmentation Analysis',
      stage: 'Advanced',
      objective: 'Segment customers into meaningful groups using unsupervised learning and turn the segments into an actionable business framing.',
      requirements: [
        'Select features relevant to segmentation and justify the choice',
        'Apply K-means and at least one alternative clustering method',
        'Evaluate clusters with silhouette score and domain judgment',
        'Profile each segment with descriptive statistics and visualizations',
        'Write a recommendation describing how the business should treat each segment differently'
      ],
      skillsEvaluated: ['Clustering', 'Feature Engineering', 'Data Analysis', 'Business Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit your clustering notebook and a report profiling each segment with a clear, distinct business recommendation per segment.',
        textLabel: 'Segmentation report',
        minTextLength: 1500,
        linkLabels: ['Segment profiles']
      }
    }
  ],

  simTasks: [
    {
      title: 'Investigate a sudden drop in model accuracy',
      context: 'Overnight, the accuracy of a deployed churn model dropped from 87% to 71% without any code change. The business team is alarmed and needs an explanation and a plan today.',
      requirements: [
        'Form a hypothesis for the drop (data drift, feature pipeline change, schema changes)',
        'Compare feature distributions between training data and recent production data',
        'Check whether any upstream data feed or schema changed recently',
        'Propose a short-term fix and a monitoring plan to detect future drift'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'A root-cause investigation with evidence, an immediate mitigation, and a drift-monitoring proposal.',
      skills: ['Model Evaluation', 'Data Drift', 'Investigative Analysis', 'Communication']
    },
    {
      title: 'Choose a success metric for a new feature',
      context: 'The product team wants to launch a recommendation model and asks you to define what "success" looks like. Historically they have only looked at overall click-through rate.',
      requirements: [
        'Propose a business-aligned primary metric beyond raw CTR',
        'Explain the trade-off between engagement and revenue metrics',
        'Define an evaluation plan including an experimentation design',
        'Quantify the minimum detectable improvement the team should care about'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'A metric definition document with rationale, an experimentation plan, and success thresholds.',
      skills: ['Metric Design', 'Experiment Design', 'Business Communication', 'Statistics']
    },
    {
      title: 'Handle an ambiguous business request',
      context: 'A VP asks you to "find out why sales are down this quarter" with total freedom on approach and no deadline. There is enormous pressure to act quickly and analytically.',
      requirements: [
        'Clarify scope by defining what "sales down" means and which segments to include',
        'Propose a structured analytical plan with an initial hypothesis set',
        'Identify which data sources exist and what analysis is feasible',
        'Set expectations on timeline, deliverables and limitations'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'A scoped analysis plan with clarified objectives, hypotheses and a proposed timeline.',
      skills: ['Problem Framing', 'Scope Management', 'Communication', 'Analytical Planning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Ravi Patel',
      personaRole: 'ML Engineer',
      situation: 'Collaborating on whether the trained model should be deployed as-is or retrained using a more complex algorithm.',
      openingMessage:
        'Your random forest beats my linear model on ROC-AUC, but I\'m worried about deployment latency and interpretability. Before we commit to production, can you walk me through the trade-offs from your side?',
      expectedPoints: [
        'Compares performance gain against added complexity and latency',
        'Discusses interpretability needs for the specific business use case',
        'Considers retraining cost and ongoing maintenance of the more complex model',
        'Proposes an evidence-based decision, possibly a staged deployment'
      ]
    },
    {
      kind: 'team',
      personaName: 'Amara Okafor',
      personaRole: 'Data Engineer',
      situation: 'Coordinating on data pipeline quality after you noticed missing values and inconsistent timestamps in the source feed.',
      openingMessage:
        'I saw your analysis flagged a bunch of missing values and timezone inconsistencies in our ingestion pipeline. I\'d like to understand what\'s broken on the data side so I can fix it — walk me through what you found.',
      expectedPoints: [
        'Describes specific data-quality issues with examples and location',
        'Distinguishes genuine missing data from encoding problems',
        'Proposes a concrete fix for the ingestion pipeline',
        'Agrees on validation checks to catch regressions going forward'
      ]
    },
    {
      kind: 'client',
      personaName: 'Elena Petrova',
      personaRole: 'Head of Retention, Lumen Services',
      situation: 'Client asks whether your churn model can be trusted for a decision as significant as which customers receive retention offers.',
      openingMessage:
        'We\'re planning to spend real marketing budget acting on your churn prediction. How confident are you in these numbers, and what happens if the model is wrong?',
      expectedPoints: [
        'Explains the model\'s confidence without overstating certainty',
        'Describes how the model was evaluated and its realistic error rate',
        'Recommends guardrails, such as a confirmation threshold before acting',
        'Sets expectations about monitoring and when to retrain'
      ]
    },
    {
      kind: 'client',
      personaName: 'Marcus Chen',
      personaRole: 'VP of Operations, Atlantic Freight',
      situation: 'Client wants you to explain a confusing visualization the previous analyst left behind before a board review tomorrow.',
      openingMessage:
        'One of our analysts made this chart showing "delay minutes by route" but I genuinely can\'t tell what it\'s saying, and I have to present it to the board. Can you help me make sense of it?',
      expectedPoints: [
        'Explains the chart\'s message in plain language without technical jargon',
        'Simplifies or redesigns the visual so the key finding is obvious',
        'Adds clear labels, titles and annotations for the board audience',
        'Prepares the client to answer likely follow-up questions'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'Metrics presented in a key stakeholder report are out of date because the underlying data refresh scheduled for 2am failed silently overnight.',
      requiredActions: [
        { action: 'Check the data pipeline logs to identify why the refresh failed', good: true, note: 'Diagnose the root cause before blaming any one component.' },
        { action: 'Flag the issue to stakeholders immediately rather than waiting to be asked', good: true, note: 'Transparency on data quality builds trust even when delivery is delayed.' },
        { action: 'Trigger a manual refresh once the failure is understood', good: true, note: 'Restore the correct data as the first priority after diagnosis.' },
        { action: 'Quietly ship the stale numbers and hope nobody checks', good: false, note: 'Presenting outdated data without disclosure damages credibility.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Three days before your model goes live, the product owner decides the primary success metric must change from revenue lift to customer satisfaction, which you did not plan for.',
      requiredActions: [
        { action: 'Assess whether the new metric requires a different evaluation and additional data', good: true, note: 'Metric changes can imply new data collection and evaluation criteria.' },
        { action: 'Clarify what customer-satisfaction data is available and its quality', good: true, note: 'A metric is only usable if reliable data supports it.' },
        { action: 'Quantify the impact of the change on the launch timeline and communicate it', good: true, note: 'Setting realistic expectations avoids an impossible deadline.' },
        { action: 'Ignore the change and launch with the original metric to avoid slippage', good: false, note: 'Launching against the wrong success metric misaligns the team\'s goal.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between correlation and causation, and why it matters for data-driven decisions.',
      guidancePoints: [
        'Correlation measures association; causation means one variable brings about a change in another',
        'Confounding variables can make correlated variables appear causally related',
        'Only carefully designed experiments (or strong causal methods) establish causation',
        'Acting on spurious correlation can lead to costly wrong decisions'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'When would you choose mean squared error versus mean absolute error for a regression task?',
      guidancePoints: [
        'MSE penalizes large errors more heavily, making it sensitive to outliers',
        'MAE treats all errors equally and is more robust to outliers',
        'If large errors are especially costly, MSE may be appropriate despite outlier sensitivity',
        'Combine with residual analysis to understand the error distribution'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are asked to predict house prices but the dataset has 20% missing values across several columns. How do you proceed?',
      guidancePoints: [
        'Investigate why values are missing (missing at random versus not at random)',
        'Decide between dropping rows/columns and imputing based on the missingness pattern',
        'Choose an imputation method appropriate to feature type and distribution',
        'Validate that the chosen approach does not introduce bias into the model'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A model performs well on the validation set but terribly on new real-world data. Walk through your diagnosis.',
      guidancePoints: [
        'Check for data leakage between training and validation',
        'Investigate whether the real-world data distribution differs (drift)',
        'Review whether the validation set truly represents the deployment population',
        'Consider a sample design bias or a change in user behavior since training'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A stakeholder insists on a specific algorithm they read about, even though your evaluation shows a simpler model performs better. How do you respond?',
      guidancePoints: [
        'Respect the idea but back the decision with evaluation evidence',
        'Explain the simpler model\'s performance and its operational benefits',
        'Propose running both if cost permits, letting results decide',
        'Keep the collaboration constructive by aligning on goals rather than tools'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide whether a finding is significant enough to act on, or whether to run a more thorough investigation first?',
      guidancePoints: [
        'Consider the business cost of acting on a wrong finding',
        'Evaluate statistical significance alongside practical/effect size',
        'Account for sample size and data quality',
        'Weigh the cost of delaying a decision against the value of more evidence'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain what a p-value is to a non-technical executive who has never studied statistics.',
      guidancePoints: [
        'Use an analogy that avoids statistical jargon, e.g. the odds of a coincidence',
        'Frame it as evidence strength, not as the probability the hypothesis is true',
        'Emphasize it must be interpreted alongside effect size and context',
        'Be honest about what it does not tell you'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover the model you were about to recommend has a subtle bias against a minority customer group. How do you communicate this?',
      guidancePoints: [
        'Present the evidence for the bias with concrete numbers and examples',
        'Explain the business and ethical consequences without alarmism',
        'Propose concrete mitigation steps, such as rebalancing or fairness adjustments',
        'Set realistic expectations about trade-offs between accuracy and fairness'
      ]
    }

  ]

}

import type { CareerDef } from '../framework.js'

export const nlpEngineer: CareerDef = {
  slug: 'nlp-engineer',
  name: 'NLP Engineer',
  category: 'AI & Data',
  order: 17,
  description:
    'Processes human language at scale: tokenization, embeddings, classification, NER and transformer-based pipelines.',
  difficulty: 'Advanced',
  pathSummary:
    'Python & linguistics foundations → text preprocessing & tokenization → classical NLP (TF-IDF, word vectors) → transformer architectures & Hugging Face → named entity recognition & text classification → deployment of NLP pipelines at scale.',
  mainSkills: [
    'Python',
    'Tokenization & Text Preprocessing',
    'Transformers & Hugging Face',
    'Text Classification',
    'Named Entity Recognition',
    'Word Embeddings',
    'spaCy / NLTK',
    'Model Fine-Tuning'
  ],
  sourcePlatforms: [
    'Hugging Face',
    'spaCy Documentation',
    'NLTK Documentation',
    'PyTorch',
    'Python'
  ],
  companyName: 'LinguaTech Solutions',
  roleTitle: 'NLP Engineer',

  chapters: [
    {
      slug: 'nlp-foundations',
      stage: 'Beginner',
      title: 'Python & NLP Foundations',
      description: 'Core Python skills and the linguistic concepts that underpin every NLP pipeline.',
      topics: [
        {
          slug: 'python-for-nlp',
          title: 'Python for NLP Workflows',
          minutes: 28,
          objectives: [
            'Write idiomatic Python with regular expressions for text manipulation',
            'Use collections, itertools and generator patterns for stream processing',
            'Handle file I/O and encoding for multilingual text corpora'
          ],
          sections: [
            { heading: 'Text as data in Python', body: 'NLP engineers work primarily with strings. Python\'s str methods, regex module and Unicode support form the foundation of every preprocessing pipeline. Understanding bytes versus strings — and the difference between UTF-8, UTF-16 and Latin-1 — prevents encoding errors that silently corrupt multilingual data.' },
            { heading: 'Regular expressions for pattern matching', body: 'The re module enables powerful pattern extraction: email addresses, phone numbers, URLs and domain-specific tokens. Compiled patterns with named groups make extraction pipelines readable. Use raw strings (r\'...\') to avoid escaping headaches and test patterns with re.VERBOSE for complex rules.' },
            { heading: 'Streaming and batching large corpora', body: 'Loading an entire multi-gigabyte corpus into memory is impractical. Generators, line-by-line file iteration and itertools.batched let you process documents one at a time or in controlled batches. This streaming mindset scales preprocessing from toy datasets to production web-scale text.' }
          ],
          links: [
            { title: 'Python Regular Expression HOWTO', url: 'https://docs.python.org/3/howto/regex.html', sourceName: 'Python', resourceType: 'tutorial', relationship: 'Official guide to regex patterns and usage in Python.' },
            { title: 'NLTK Book — Chapter 3', url: 'https://www.nltk.org/book/ch03.html', sourceName: 'NLTK Documentation', resourceType: 'tutorial', relationship: 'Practical introduction to processing raw text with NLTK.' },
            { title: 'spaCy 101', url: 'https://spacy.io/usage/spacy-101', sourceName: 'spaCy Documentation', resourceType: 'tutorial', relationship: 'Overview of spaCy\'s architecture and core NLP concepts.' }
          ],
          quiz: {
            prompt: 'Why is re.compile() preferred over calling re.search() directly on every call?',
            options: [
              'Compiled patterns are more accurate',
              'Compiled patterns cache the regex bytecode, avoiding recompilation on each match',
              're.search() does not support groups',
              're.compile() enables Unicode mode'
            ],
            answerIndex: 1,
            explanation: 're.compile() pre-compiles the regex into a Pattern object. When used repeatedly — especially inside loops processing millions of tokens — this avoids the overhead of parsing the regex string every time.'
          }
        },
        {
          slug: 'linguistics-for-engineers',
          title: 'Linguistics Essentials for Engineers',
          minutes: 27,
          objectives: [
            'Define tokenization, stemming, lemmatization and their differences',
            'Explain part-of-speech tagging and its role in downstream tasks',
            'Describe how morphology and syntax influence NLP pipeline design'
          ],
          sections: [
            { heading: 'Tokens, stems and lemmas', body: 'Tokenization splits raw text into meaningful units — words, subwords or sentences. Stemming applies crude heuristic rules to chop suffixes (running → runn), while lemmatization uses vocabulary and morphological analysis to return dictionary forms (better → good). Lemmatization is more accurate but computationally heavier.' },
            { heading: 'Part-of-speech and syntactic structure', body: 'POS tagging assigns grammatical categories (noun, verb, adjective) to each token. This enables feature extraction — nouns as potential entities, verbs as actions — and improves downstream tasks like named entity recognition and dependency parsing. Every modern NLP pipeline starts with some form of POS analysis.' },
            { heading: 'Why engineers need linguistics', body: 'Ignoring linguistic structure leads to naive preprocessing: splitting "New York" into two tokens loses a key entity, and stemming "studies" to "studi" breaks vocabulary alignment with a model trained on full words. A working knowledge of morphology and syntax helps you design preprocessing that preserves meaning.' }
          ],
          links: [
            { title: 'NLTK Book — Chapter 2', url: 'https://www.nltk.org/book/ch02.html', sourceName: 'NLTK Documentation', resourceType: 'tutorial', relationship: 'Accessing linguistic corpora and understanding their structure.' },
            { title: 'spaCy Linguistic Annotations', url: 'https://spacy.io/usage/linguistic-features', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'How spaCy handles tokens, POS, dependencies and entities.' },
            { title: 'NLTK Lemmatization API', url: 'https://www.nltk.org/api/nltk.stem.html', sourceName: 'NLTK Documentation', resourceType: 'reference', relationship: 'Reference for WordNetLemmatizer and PorterStemmer.' }
          ],
          quiz: {
            prompt: 'The key difference between stemming and lemmatization is…',
            options: [
              'Stemming is always more accurate',
              'Lemmatization uses dictionary lookup to return valid words; stemming uses heuristic suffix rules',
              'They are synonyms for the same process',
              'Stemming requires GPU acceleration'
            ],
            answerIndex: 1,
            explanation: 'Stemming chops suffixes with rule-based heuristics and may produce non-words ("studi"). Lemmmatization uses morphological analysis and a vocabulary to return actual dictionary forms ("study").'
          }
        },
        {
          slug: 'nlp-toolchain-overview',
          title: 'The NLP Toolchain: NLTK, spaCy & Hugging Face',
          minutes: 28,
          objectives: [
            'Install and configure NLTK, spaCy and Hugging Face Transformers',
            'Compare when to use each library based on task requirements',
            'Load pre-trained pipelines for tokenization, POS tagging and NER'
          ],
          sections: [
            { heading: 'NLTK: the teaching library', body: 'NLTK provides tokenizers, stemmers, POS taggers, corpora and visualizations. Its interactive API makes it ideal for exploration, prototyping and education. However, its performance characteristics are not production-grade — spaCy and Transformers outperform it for high-throughput pipelines.' },
            { heading: 'spaCy: industrial-strength NLP', body: 'spaCy is designed for production: fast C-based tokenization, efficient POS and dependency parsing, built-in NER and a pipeline architecture. Its `nlp()` object runs all components in one pass. Use spaCy when you need speed and reliability on large document volumes.' },
            { heading: 'Hugging Face Transformers: modern deep NLP', body: 'Transformers provides thousands of pre-trained models — BERT, RoBERTa, T5, GPT — for classification, NER, summarization and more. The pipeline() API abstracts away tokenization, model loading and post-processing into a single function call. Use Transformers when state-of-the-art accuracy matters more than raw speed.' }
          ],
          links: [
            { title: 'Hugging Face Transformers Quick Tour', url: 'https://huggingface.co/docs/transformers/quicktour', sourceName: 'Hugging Face', resourceType: 'tutorial', relationship: 'Getting started with the Transformers library and pipeline API.' },
            { title: 'spaCy Usage Guide', url: 'https://spacy.io/usage', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'Official usage documentation for spaCy pipelines.' },
            { title: 'NLTK Installation', url: 'https://www.nltk.org/install.html', sourceName: 'NLTK Documentation', resourceType: 'guide', relationship: 'Installation instructions and data downloads for NLTK.' }
          ],
          quiz: {
            prompt: 'You need to process 50,000 documents per hour with NER, POS tagging and dependency parsing. Which library is best suited?',
            options: [
              'NLTK for its comprehensive API',
              'spaCy for its optimized C-based pipeline architecture',
              'Hugging Face Transformers for its large model selection',
              'Raw Python string methods'
            ],
            answerIndex: 1,
            explanation: 'spaCy is purpose-built for high-throughput production NLP. Its C-based architecture and pipeline design process documents far faster than NLTK while supporting NER, POS and dependency parsing out of the box.'
          }
        }
      ]
    },
    {
      slug: 'text-preprocessing-tokenization',
      stage: 'Foundation',
      title: 'Text Preprocessing & Tokenization',
      description: 'Transforming raw text into clean, structured tokens ready for statistical and neural models.',
      topics: [
        {
          slug: 'tokenization-strategies',
          title: 'Tokenization Strategies',
          minutes: 30,
          objectives: [
            'Implement word-level, sentence-level and subword tokenization',
            'Explain Byte-Pair Encoding and WordPiece algorithms',
            'Choose the right tokenization strategy for a given NLP task'
          ],
          sections: [
            { heading: 'Word-level tokenization', body: 'Splitting on whitespace and punctuation is the simplest approach, but fails on contractions ("don\'t" → "do" + "n\'t"), hyphenated words and multilingual text. NLTK\'s word_tokenize uses the Penn Treebank tokenizer, which handles English edge cases well. For non-English languages, language-specific rules are essential.' },
            { heading: 'Subword tokenization: BPE and WordPiece', body: 'Modern transformers use subword tokenization to balance vocabulary size against out-of-vocabulary tokens. Byte-Pair Encoding (BPE) iteratively merges the most frequent character pairs. WordPiece does the same but uses likelihood-based merging. Both handle rare words, misspellings and morphologically rich languages gracefully by decomposing them into known subwords.' },
            { heading: 'Sentence tokenization', body: 'Splitting text into sentences is a prerequisite for tasks like summarization and question answering. spaCy\'s sentencizer uses dependency parsing for accuracy, while NLTK\'s sent_tokenize uses punctuation heuristics. For multilingual corpora, rule-based sentence splitters must handle language-specific abbreviation patterns to avoid false splits.' }
          ],
          links: [
            { title: 'Hugging Face Tokenizers Library', url: 'https://huggingface.co/docs/tokenizers/en/quicktour', sourceName: 'Hugging Face', resourceType: 'tutorial', relationship: 'Fast, customizable tokenization with BPE, WordPiece and more.' },
            { title: 'spaCy Tokenizer', url: 'https://spacy.io/usage/linguistic-features#tokenization', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'How spaCy handles tokenization with configurable rules.' },
            { title: 'NLTK Tokenizers', url: 'https://www.nltk.org/api/nltk.tokenize.html', sourceName: 'NLTK Documentation', resourceType: 'reference', relationship: 'API reference for word_tokenize and sent_tokenize.' }
          ],
          quiz: {
            prompt: 'Byte-Pair Encoding handles out-of-vocabulary words by…',
            options: [
              'Returning an <UNK> token for every unseen word',
              'Decomposing rare words into known subword units through iterative pair merging',
              'Extending the vocabulary with new entries at runtime',
              'Ignoring words that are not in the training vocabulary'
            ],
            answerIndex: 1,
            explanation: 'BPE starts with individual characters and iteratively merges the most frequent pairs. At inference time, any word — however rare — can be decomposed into a sequence of known subword tokens, eliminating the out-of-vocabulary problem.'
          }
        },
        {
          slug: 'text-cleaning-normalization',
          title: 'Text Cleaning & Normalization',
          minutes: 25,
          objectives: [
            'Implement lowercasing, stopword removal and punctuation stripping',
            'Handle HTML tags, special characters and encoding artifacts',
            'Apply Unicode normalization and case folding for multilingual text'
          ],
          sections: [
            { heading: 'Lowercasing and case folding', body: 'Lowercasing normalizes "The" and "the" into a single token. However, it destroys case-sensitive features: "US" (country) versus "us" (pronoun), and named entities at the start of sentences. Case folding is a more aggressive normalization used in search engines. Always evaluate whether case information matters for your task before stripping it.' },
            { heading: 'Stopword removal and when to skip it', body: 'Stopwords ("the", "is", "at") carry little semantic weight for bag-of-words models. Removing them reduces dimensionality and noise. However, for transformer-based models and tasks like sentiment analysis, stopwords carry grammatical structure that matters. Modern practice often skips stopword removal for neural models and reserves it for classical TF-IDF approaches.' },
            { heading: 'Handling messy text', body: 'Real-world text contains HTML tags, URLs, email addresses, @mentions, hashtags and Unicode artifacts. Build a preprocessing pipeline that strips HTML with BeautifulSoup or regex, normalizes URLs to a <URL> placeholder, handles @mentions and removes excessive whitespace. Unicode normalization (NFC/NFKC) ensures that visually identical characters are treated as the same.' }
          ],
          links: [
            { title: 'Python Unicode HOWTO', url: 'https://docs.python.org/3/howto/unicode.html', sourceName: 'Python', resourceType: 'guide', relationship: 'Understanding Unicode handling in Python.' },
            { title: 'spaCy Pipeline Configuration', url: 'https://spacy.io/usage/processing-pipelines', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'Configuring spaCy\'s preprocessing pipeline components.' },
            { title: 'NLTK Stopwords Corpus', url: 'https://www.nltk.org/book/ch02.html', sourceName: 'NLTK Documentation', resourceType: 'tutorial', relationship: 'Using and customizing stopwords lists across languages.' }
          ],
          quiz: {
            prompt: 'Why might removing stopwords hurt transformer-based sentiment classification?',
            options: [
              'Transformers cannot process short sequences',
              'Stopwords carry grammatical structure and negation patterns that influence sentiment',
              'Transformers do not support tokenized input',
              'Stopword removal is computationally expensive for transformers'
            ],
            answerIndex: 1,
            explanation: 'Words like "not" and "no" are stopwords that flip sentiment polarity. Transformers use contextual embeddings where function words contribute to the meaning of the full sequence, so removing them can degrade classification accuracy.'
          }
        },
        {
          slug: 'bag-of-words-tfidf',
          title: 'Bag-of-Words & TF-IDF',
          minutes: 26,
          objectives: [
            'Build document-term matrices using CountVectorizer and TfidfVectorizer',
            'Explain TF-IDF weighting and why it outperforms raw counts',
            'Apply n-gram features to capture local word order'
          ],
          sections: [
            { heading: 'From tokens to vectors', body: 'Classical NLP represents documents as sparse vectors where each dimension corresponds to a word in the vocabulary. A count vectorizer simply counts token occurrences. This bag-of-words representation ignores word order but captures frequency information that is surprisingly effective for classification and retrieval tasks.' },
            { heading: 'TF-IDF: weighting by importance', body: 'Term Frequency-Inverse Document Frequency scales word counts down for terms that appear everywhere ("the", "is") and up for terms that distinguish documents. TF = (count in document) / (total tokens). IDF = log(total documents / documents containing term). The product gives high weight to terms that are frequent in one document but rare across the corpus.' },
            { heading: 'N-grams for local context', body: 'Unigrams ("good", "not", "good") lose word order. Bigrams ("not good") capture negation. Trigrams capture longer phrases. Scikit-learn\'s TfidfVectorizer accepts an ngram_range parameter — (1,2) adds bigrams. Increasing n-gram order improves feature quality but dramatically expands the vocabulary and sparsity.' }
          ],
          links: [
            { title: 'Scikit-learn TF-IDF', url: 'https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction', sourceName: 'Python', resourceType: 'guide', relationship: 'Scikit-learn\'s text feature extraction documentation.' },
            { title: 'spaCy Text Classification', url: 'https://spacy.io/usage/textcategorization', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'Using spaCy with bag-of-words features for text classification.' },
            { title: 'NLTK Corpus Overview', url: 'https://www.nltk.org/book/ch02.html', sourceName: 'NLTK Documentation', resourceType: 'tutorial', relationship: 'Working with NLTK corpora for vocabulary analysis.' }
          ],
          quiz: {
            prompt: 'A word appears in 50 out of 1,000 documents. Its IDF score is approximately…',
            options: [
              '50 / 1,000 = 0.05',
              'log(1,000 / 50) ≈ 3.0',
              '1,000 / 50 = 20',
              'log(50) ≈ 3.9'
            ],
            answerIndex: 1,
            explanation: 'IDF is defined as log(N / df) where N is total documents and df is document frequency. log(1000/50) = log(20) ≈ 3.0. Common terms have low IDF; rare terms have high IDF.'
          }
        }
      ]
    },
    {
      slug: 'transformers-ner',
      stage: 'Intermediate',
      title: 'Transformers & Named Entity Recognition',
      description: 'Leveraging pre-trained transformer models for sequence labeling, entity extraction and text understanding.',
      topics: [
        {
          slug: 'transformer-architecture',
          title: 'Transformer Architecture Deep Dive',
          minutes: 30,
          objectives: [
            'Explain the self-attention mechanism and multi-head attention',
            'Describe positional encoding and its role in sequence modeling',
            'Compare encoder-only, decoder-only and encoder-decoder architectures'
          ],
          sections: [
            { heading: 'Self-attention and QKV projections', body: 'Self-attention computes a weighted combination of all tokens in a sequence for each position. Three learned projections — Query, Key and Value — determine how much each token should attend to every other token. The attention scores are softmax(QK^T / sqrt(d_k)) applied to V, enabling the model to capture long-range dependencies without recurrence.' },
            { heading: 'Positional encoding', body: 'Unlike RNNs, transformers have no inherent sense of token order. Positional encodings — sinusoidal in the original paper, learned in BERT and GPT — inject sequence position information into the input embeddings. Without positional encoding, the transformer treats "dog bites man" identically to "man bites dog".' },
            { heading: 'Architecture variants', body: 'Encoder-only models (BERT, RoBERTa) bidirectionally attend to the full sequence — ideal for classification and NER. Decoder-only models (GPT, LLaMA) attend only to previous tokens — designed for generation. Encoder-decoder models (T5, BART) use an encoder for understanding and a decoder for generation — suited for summarization and translation tasks.' }
          ],
          links: [
            { title: 'Hugging Face Model Hub', url: 'https://huggingface.co/models', sourceName: 'Hugging Face', resourceType: 'reference', relationship: 'Browse pre-trained transformer models by architecture and task.' },
            { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', sourceName: 'PyTorch', resourceType: 'article', relationship: 'The foundational transformer paper.' },
            { title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', sourceName: 'Hugging Face', resourceType: 'tutorial', relationship: 'Visual, intuitive walkthrough of transformer mechanics.' }
          ],
          quiz: {
            prompt: 'An encoder-only transformer like BERT is most suitable for which task?',
            options: [
              'Autoregressive text generation',
              'Bidirectional sequence classification and token labeling (NER)',
              'Image captioning',
              'Audio synthesis'
            ],
            answerIndex: 1,
            explanation: 'BERT\'s bidirectional self-attention lets every token attend to all other tokens, making it ideal for tasks where you need full-context understanding — classification, NER, question answering — rather than left-to-right generation.'
          }
        },
        {
          slug: 'text-classification-transformers',
          title: 'Text Classification with Transformers',
          minutes: 28,
          objectives: [
            'Fine-tune a pre-trained BERT model for sentiment classification',
            'Implement proper data tokenization with padding and truncation',
            'Evaluate classification performance with precision, recall and F1'
          ],
          sections: [
            { heading: 'Fine-tuning pre-trained models', body: 'Pre-trained transformers have already learned general language representations from billions of tokens. Fine-tuning adds a classification head on top and trains the entire model on your labeled dataset for a few epochs. This transfer learning approach achieves state-of-the-art results with far less labeled data than training from scratch.' },
            { heading: 'Data tokenization for classification', body: 'Before feeding text to BERT, tokenize it with the model\'s matching tokenizer. Add [CLS] and [SEP] tokens, pad shorter sequences to a fixed length and truncate longer ones. The [CLS] token\'s final hidden state becomes the document representation for classification. Use PyTorch DataLoader and Dataset for efficient batching.' },
            { heading: 'Evaluation metrics', body: 'Accuracy alone is misleading on imbalanced datasets. Precision measures how many predicted positives are actually positive. Recall measures how many actual positives were found. F1 is the harmonic mean of precision and recall. For multi-class problems, macro-averaging weights each class equally, while micro-averaging weights by sample count.' }
          ],
          links: [
            { title: 'Hugging Face Fine-tuning Tutorial', url: 'https://huggingface.co/docs/transformers/training', sourceName: 'Hugging Face', resourceType: 'tutorial', relationship: 'Step-by-step guide to fine-tuning transformers for classification.' },
            { title: 'BERT for Sequence Classification', url: 'https://huggingface.co/bert-base-uncased', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Pre-trained BERT model with classification head examples.' },
            { title: 'PyTorch DataLoader', url: 'https://pytorch.org/docs/stable/data.html', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'PyTorch dataset and DataLoader for batching training data.' }
          ],
          quiz: {
            prompt: 'When fine-tuning BERT for text classification, what does the [CLS] token represent?',
            options: [
              'The first word of the input text',
              'A special classification token whose hidden state aggregates the full sequence representation',
              'The most frequent token in the vocabulary',
              'A padding token for shorter sequences'
            ],
            answerIndex: 1,
            explanation: 'BERT prepends a [CLS] token to every input. During fine-tuning, its final hidden state is trained to represent the entire sequence for classification, while all other token states are used for token-level tasks like NER.'
          }
        },
        {
          slug: 'ner-sequence-labeling',
          title: 'Named Entity Recognition & Sequence Labeling',
          minutes: 30,
          objectives: [
            'Implement NER using spaCy and Hugging Face Transformers',
            'Understand BIO tagging scheme for entity boundary detection',
            'Evaluate NER performance with entity-level precision, recall and F1'
          ],
          sections: [
            { heading: 'The BIO tagging scheme', body: 'NER models output a label for every token. BIO tagging uses three prefixes: B (Beginning) marks the first token of an entity, I (Inside) marks continuation tokens and O (Outside) marks non-entity tokens. For example, "New York City" becomes B-LOC, I-LOC, I-LOC. This scheme unambiguously marks entity boundaries and separates adjacent entities of the same type.' },
            { heading: 'NER with spaCy', body: 'spaCy provides pre-trained NER models in multiple languages via nlp(text).ents. For custom entities, train a new NER component using spaCy\'s spacy train CLI with gold-standard annotations. spaCy\'s entity ruler lets you combine rule-based and statistical NER — pattern matching for known entities and ML for novel ones.' },
            { heading: 'NER with Transformers', body: 'Hugging Face provides token-classification pipelines with models fine-tuned on CoNLL-2003 and OntoNotes. The pipeline automatically handles tokenization alignment — mapping subword tokens back to original word boundaries for entity grouping. For fine-tuning, use TokenClassification models and compute entity-level metrics rather than token-level accuracy.' }
          ],
          links: [
            { title: 'spaCy NER Guide', url: 'https://spacy.io/usage/linguistic-features#named-entities', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'Official guide to NER in spaCy including training custom models.' },
            { title: 'Hugging Face NER Pipeline', url: 'https://huggingface.co/docs/transformers/main/en/main_classes/pipelines#transformers.TokenClassificationPipeline', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Reference for the token classification pipeline.' },
            { title: 'NLTK Named Entity Chunking', url: 'https://www.nltk.org/book/ch07.html', sourceName: 'NLTK Documentation', resourceType: 'tutorial', relationship: 'Classical NER approach with NLTK\'s chunk parser.' }
          ],
          quiz: {
            prompt: 'In BIO tagging, the sequence B-PER I-PER O B-LOC represents…',
            options: [
              'A single person entity followed by a location entity',
              'Two separate person entities and one location',
              'A person entity spanning two tokens and a location entity',
              'One person and one location with no boundary markers'
            ],
            answerIndex: 2,
            explanation: 'B-PER I-PER marks a person entity spanning two tokens ("John Smith"). O is a non-entity token. B-LOC marks the start of a new location entity. The B prefix disambiguates this from a continuation of the person entity.'
          }
        }
      ]
    },
    {
      slug: 'advanced-nlp-deployment',
      stage: 'Advanced',
      title: 'Advanced NLP & Production Deployment',
      description: 'Building, fine-tuning and deploying NLP systems at scale with monitoring and evaluation.',
      topics: [
        {
          slug: 'model-fine-tuning-deep-dive',
          title: 'Fine-Tuning Transformers from Scratch',
          minutes: 30,
          objectives: [
            'Configure training loops with learning rate scheduling and gradient accumulation',
            'Apply LoRA and parameter-efficient fine-tuning techniques',
            'Handle class imbalance with weighted loss functions and oversampling'
          ],
          sections: [
            { heading: 'Training loop essentials', body: 'Fine-tuning transformers requires careful hyperparameter choices. Use a linear learning rate scheduler with warmup to prevent early instability. Gradient accumulation simulates larger batch sizes when GPU memory is limited. Mixed precision training (FP16/BF16) halves memory usage and speeds up training with minimal accuracy loss.' },
            { heading: 'Parameter-efficient fine-tuning', body: 'Full fine-tuning updates all model parameters, which is expensive for large models. LoRA (Low-Rank Adaptation) freezes the original weights and trains small low-rank matrices injected into attention layers. This reduces trainable parameters by 90%+ while achieving comparable accuracy. Adapter layers and prefix tuning are alternative PEFT strategies.' },
            { heading: 'Class imbalance in NLP', body: 'NER datasets often have 90%+ O (outside) tokens, and sentiment datasets may be skewed toward one class. Weighted cross-entropy assigns higher loss to underrepresented classes. Focal loss down-weights easy examples. Oversampling minority classes or using SMOTE for feature-space augmentation are complementary strategies that improve recall on rare entities.' }
          ],
          links: [
            { title: 'Hugging Face PEFT Library', url: 'https://huggingface.co/docs/peft/index', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Parameter-efficient fine-tuning with LoRA, adapters and more.' },
            { title: 'PyTorch Learning Rate Schedulers', url: 'https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'PyTorch schedulers for warmup and cosine annealing.' },
            { title: 'spaCy Training Guide', url: 'https://spacy.io/usage/training', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'Step-by-step guide to training custom NLP pipelines.' }
          ],
          quiz: {
            prompt: 'LoRA reduces fine-tuning cost by…',
            options: [
              'Reducing the input text to shorter sequences',
              'Freezing pre-trained weights and training only small low-rank adapter matrices',
              'Using smaller batch sizes during training',
              'Removing the attention mechanism entirely'
            ],
            answerIndex: 1,
            explanation: 'LoRA injects trainable low-rank decomposition matrices into attention layers while keeping the original weights frozen. This achieves near-full-fine-tuning accuracy with a fraction of the trainable parameters and GPU memory.'
          }
        },
        {
          slug: 'nlp-evaluation-metrics',
          title: 'NLP Evaluation Methodologies',
          minutes: 28,
          objectives: [
            'Compute entity-level and sequence-level metrics for NER',
            'Implement cross-validation and stratified splitting for NLP datasets',
            'Build automated evaluation pipelines for continuous quality monitoring'
          ],
          sections: [
            { heading: 'Entity-level vs token-level metrics', body: 'Token-level accuracy for NER is misleading because O tokens dominate. Entity-level metrics require exact or partial match of the full entity span and type. The seqeval library computes entity-level precision, recall and F1, which are the standard metrics in NER literature. Always report entity-level metrics for production NER systems.' },
            { heading: 'Cross-validation for small datasets', body: 'NLP datasets are often small and class-imbalanced. Stratified k-fold cross-validation ensures each fold preserves class distributions. For text data, never do random splits — use document-level splits to prevent data leakage from the same source appearing in both train and test sets.' },
            { heading: 'Production evaluation pipelines', body: 'In production, evaluation does not stop at deployment. Track inference-time metrics: prediction latency, entity confidence distributions and error rates by entity type. Build dashboards that compare production predictions against periodic human annotations. Set alerting thresholds for metric degradation that trigger retraining or rollback.' }
          ],
          links: [
            { title: 'seqeval Library', url: 'https://github.com/chakki-works/seqeval', sourceName: 'Hugging Face', resourceType: 'reference', relationship: 'entity-level NER evaluation metrics.' },
            { title: 'Hugging Face Evaluate Library', url: 'https://huggingface.co/docs/evaluate/index', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Standardized metrics and evaluation tools for NLP models.' },
            { title: 'Scikit-learn Cross Validation', url: 'https://scikit-learn.org/stable/modules/cross_validation.html', sourceName: 'Python', resourceType: 'guide', relationship: 'Cross-validation strategies including stratified k-fold.' }
          ],
          quiz: {
            prompt: 'Why is token-level accuracy a poor metric for NER evaluation?',
            options: [
              'Token-level accuracy is computationally expensive',
              'Most tokens are "O" (outside), so a model predicting all O still achieves high accuracy',
              'Token-level metrics cannot handle multiple entity types',
              'NER models do not output per-token predictions'
            ],
            answerIndex: 1,
            explanation: 'NER datasets are heavily dominated by non-entity (O) tokens — often 90%+. A model that predicts O for every token achieves 90%+ accuracy while finding zero entities. Entity-level F1 measures the actual task performance.'
          }
        },
        {
          slug: 'nlp-at-scale',
          title: 'Deploying NLP Pipelines at Scale',
          minutes: 30,
          objectives: [
            'Containerize NLP models with Docker for reproducible deployments',
            'Optimize inference with model quantization and ONNX Runtime',
            'Design batch and streaming NLP pipelines for high-throughput processing'
          ],
          sections: [
            { heading: 'Model optimization for inference', body: 'Pre-trained transformers are large — BERT-base is 440MB. Quantization reduces model weights from FP32 to INT8 or FP16, cutting memory by 2-4x with minimal accuracy loss. ONNX Runtime optimizes the computation graph for CPU and GPU inference, often achieving 2-5x speedup over PyTorch\'s eager mode. Combine both for maximum throughput.' },
            { heading: 'Batch processing pipelines', body: 'For offline NLP tasks — indexing documents, processing support tickets, running nightly NER — batch pipelines process documents in bulk. Use Apache Spark or Ray for distributed processing, or simple multiprocessing with Python\'s concurrent.futures for medium-scale workloads. Always include progress tracking, error handling and idempotent processing for restartability.' },
            { heading: 'Streaming and real-time NLP', body: 'Real-time NLP — live chat classification, real-time entity extraction from streams — requires low-latency inference. Deploy models behind a FastAPI or Flask endpoint with request batching. For event-driven architectures, consume from Kafka topics and publish NLP results to downstream topics. Monitor p95 latency and queue depth to ensure SLA compliance.' }
          ],
          links: [
            { title: 'ONNX Runtime for Hugging Face', url: 'https://huggingface.co/docs/optimum/onnxruntime/usage_guides/optimization', sourceName: 'Hugging Face', resourceType: 'guide', relationship: 'Optimizing transformer models with ONNX Runtime.' },
            { title: 'PyTorch Quantization', url: 'https://pytorch.org/docs/stable/quantization.html', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'Post-training and quantization-aware training in PyTorch.' },
            { title: 'spaCy Deployment Guide', url: 'https://spacy.io/usage/serving-spacy', sourceName: 'spaCy Documentation', resourceType: 'guide', relationship: 'Deploying spaCy pipelines as web services.' }
          ],
          quiz: {
            prompt: 'Quantizing a transformer model from FP32 to INT8 primarily achieves…',
            options: [
              'Higher prediction accuracy',
              'Reduced model size and faster inference with minimal accuracy loss',
              'Automatic hyperparameter tuning',
              'Support for additional languages'
            ],
            answerIndex: 1,
            explanation: 'INT8 quantization reduces each weight from 32 bits to 8 bits, cutting model size by 4x and accelerating inference through simpler arithmetic operations, with typically less than 1% accuracy degradation on standard benchmarks.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End NLP Pipeline for Customer Support Ticket Routing',
    coverage: [
      'Text Preprocessing & Tokenization',
      'Text Classification',
      'Named Entity Recognition',
      'Transformer Fine-Tuning',
      'Evaluation & Deployment'
    ],
    brief:
      'Build a complete NLP system that ingests raw customer support tickets, preprocesses and classifies them by intent, extracts key entities (product names, order IDs, urgency indicators), and routes them to the correct department. Include a fine-tuned classifier, an NER component, evaluation metrics and a deployable API endpoint.',
    requirements: [
      'Preprocessing pipeline with tokenization, lowercasing and special character handling',
      'Text classification model fine-tuned for at least 5 intent categories',
      'NER component extracting product names, order IDs and urgency markers',
      'Entity-level evaluation using seqeval metrics for NER',
      'Classification report with precision, recall and F1 per intent class',
      'REST API endpoint serving predictions with <200ms p95 latency',
      'Batch processing script for offline ticket analysis'
    ],
    expectedOutput:
      'A Python application with source code, a trained model checkpoint, an evaluation report showing entity-level F1 and classification F1 per class, and a FastAPI endpoint with curl examples.',
    rubric: [
      { skill: 'Preprocessing Quality', weight: 20, criteria: 'Correct tokenization, appropriate cleaning, handles edge cases like special characters and short texts' },
      { skill: 'Classification Accuracy', weight: 25, criteria: 'Fine-tuned model achieves strong macro-F1, handles class imbalance, evaluation covers all intent categories' },
      { skill: 'NER Quality', weight: 25, criteria: 'Entity-level F1 reported, BIO tagging correct, handles overlapping and nested entities' },
      { skill: 'Deployment Readiness', weight: 15, criteria: 'API endpoint works, latency under threshold, batch processing script handles errors gracefully' },
      { skill: 'Code Quality', weight: 15, criteria: 'Clean Python with type hints, modular structure, reproducible training and evaluation scripts' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Build a Multilingual Text Classifier',
      stage: 'Foundation',
      objective: 'Design and evaluate a text classification pipeline that handles text in at least two languages, comparing classical TF-IDF with transformer-based approaches.',
      requirements: [
        'Collect or use a multilingual dataset with at least 3 classes',
        'Implement a TF-IDF + Logistic Regression baseline',
        'Fine-tune a multilingual transformer (XLM-RoBERTa) for the same task',
        'Compare both approaches with accuracy, macro-F1 and inference latency',
        'Analyze failure cases per language and propose improvements'
      ],
      skillsEvaluated: ['Text Classification', 'Tokenization', 'Evaluation Methodology', 'Cross-Lingual NLP'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit a Jupyter notebook or Python project with both models, a comparison table and a written analysis of cross-lingual performance differences.',
        textLabel: 'Multilingual classification analysis',
        minTextLength: 1000,
        linkLabels: ['Comparison metrics dataset']
      }
    },
    {
      title: 'Custom NER System for Domain-Specific Entities',
      stage: 'Intermediate',
      objective: 'Build a named entity recognition system for a specialized domain (medical, legal or financial) using both rule-based and fine-tuned transformer approaches.',
      requirements: [
        'Annotate or use an existing dataset with at least 4 entity types',
        'Implement rule-based NER using spaCy EntityRuler with pattern matching',
        'Fine-tune a token classification model (BERT or RoBERTa) on the annotated data',
        'Compute entity-level precision, recall and F1 using seqeval',
        'Compare rule-based versus ML-based NER and propose a combined strategy'
      ],
      skillsEvaluated: ['Named Entity Recognition', 'Data Annotation', 'Fine-Tuning', 'spaCy', 'Evaluation'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the complete project with annotation guidelines, training scripts, evaluation results and a report comparing the two NER approaches.',
        textLabel: 'NER system comparison report',
        minTextLength: 1200,
        linkLabels: ['Entity annotation guidelines']
      }
    },
    {
      title: 'Production NLP Pipeline with Monitoring',
      stage: 'Advanced',
      objective: 'Deploy a complete NLP pipeline (classification + NER) as a scalable API with real-time monitoring, model versioning and automatic fallback.',
      requirements: [
        'Build a FastAPI service serving both classification and NER predictions',
        'Implement request batching for throughput optimization',
        'Add structured logging for every prediction with confidence scores',
        'Set up model versioning with the ability to rollback to previous versions',
        'Implement a fallback model when the primary model fails or times out',
        'Create a health check endpoint and Prometheus-compatible metrics'
      ],
      skillsEvaluated: ['MLOps', 'API Design', 'Monitoring', 'Model Serving', 'Python'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the API application with Docker configuration, monitoring dashboard setup, a load test report and a runbook for model rollback procedures.',
        textLabel: 'Production pipeline architecture report',
        minTextLength: 1500,
        linkLabels: ['Dockerfile and deployment config', 'Load test results']
      }
    }
  ],

  simTasks: [
    {
      title: 'NER accuracy collapse after vocabulary update',
      context: 'The NER pipeline for extracting product names from customer reviews was retrained after adding 500 new products to the vocabulary. Entity-level F1 dropped from 0.89 to 0.61. Product support tickets are being misrouted because entities are missed.',
      requirements: [
        'Investigate whether the new vocabulary caused catastrophic forgetting',
        'Check if the new product names share tokens with existing entities',
        'Propose a fix using incremental fine-tuning or vocabulary expansion',
        'Design an evaluation protocol to prevent regression before deployment'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'Root cause analysis, implementation plan for vocabulary-safe retraining, and an evaluation checklist for safe model updates.',
      skills: ['Fine-Tuning', 'NER', 'Evaluation', 'Model Management']
    },
    {
      title: 'Classify support tickets in a new language',
      context: 'The company is expanding to Japan and needs the English intent classification model to work for Japanese customer support tickets. The Japanese team has provided 2,000 labeled examples.',
      requirements: [
        'Evaluate the current English model on Japanese text to establish a baseline',
        'Fine-tune a multilingual transformer on the Japanese dataset',
        'Compare monolingual Japanese model versus multilingual model performance',
        'Assess whether the same 5 intent categories apply or if they need adjustment',
        'Produce a deployment plan with latency benchmarks for the Japanese market'
      ],
      priority: 'high',
      dueDayOffset: 7,
      expectedOutput: 'Evaluation report with baseline comparison, fine-tuned model performance and deployment recommendation.',
      skills: ['Cross-Lingual NLP', 'Text Classification', 'Data Analysis', 'Deployment']
    },
    {
      title: 'Reduce inference latency for real-time NER',
      context: 'The NER endpoint is averaging 340ms per request but the product team requires <100ms p95 latency for a real-time chat feature. The current model is bert-base-cased running on CPU.',
      requirements: [
        'Profile the inference pipeline to identify bottlenecks (tokenization, model, post-processing)',
        'Explore model quantization (INT8/FP16) and ONNX Runtime optimization',
        'Evaluate smaller model alternatives (DistilBERT, MobileBERT) for latency trade-offs',
        'Implement request batching to handle concurrent traffic efficiently',
        'Benchmark each optimization and report latency versus accuracy trade-offs'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Benchmarking report with latency/accuracy trade-offs for each optimization, and a recommendation for the production configuration.',
      skills: ['Model Optimization', 'ONNX Runtime', 'Profiling', 'Latency Engineering']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Aisha Patel',
      personaRole: 'Data Annotator Lead',
      situation: 'Discussing annotation guidelines and quality for a new NER dataset being built for financial entity extraction.',
      openingMessage:
        'We have 15 annotators labeling financial entities in earnings calls. Inter-annotator agreement is only 72% on CURRENCY and 65% on REVENUE entities. Before we scale up annotation, I need your input on how to improve consistency without making guidelines so complex that annotation speed drops to a crawl.',
      expectedPoints: [
        'Analyzes which entity types have the lowest agreement and why (ambiguous boundaries, overlapping types)',
        'Proposes simplifying guidelines with concrete examples for edge cases',
        'Suggests a two-pass annotation strategy: initial pass plus adjudication for disagreements',
        'Quantifies the impact of annotation quality on downstream NER F1'
      ]
    },
    {
      kind: 'team',
      personaName: 'Devon Marsh',
      personaRole: 'Backend Engineer',
      situation: 'Integration discussion about serving NLP models behind the main application API.',
      openingMessage:
        'The main API is a Node.js service and your NLP models are Python. I need to understand how we integrate these without adding too much latency or operational complexity. What is your recommended architecture?',
      expectedPoints: [
        'Proposes a separate Python microservice with gRPC or REST for low-latency communication',
        'Discusses model loading strategy — load once at startup versus lazy loading',
        'Addresses cold start times for containerized model services',
        'Suggests caching for repeated or near-identical inputs to reduce inference load'
      ]
    },
    {
      kind: 'client',
      personaName: 'Rachel Kim',
      personaRole: 'VP of Operations, QuickShip Logistics',
      situation: 'Client wants to automate routing of thousands of daily customer emails using NLP classification.',
      openingMessage:
        'We receive about 8,000 customer emails daily. Currently a team of 6 people manually reads and routes each one. We want an NLP system to classify intent and extract key information automatically. What should we expect in terms of accuracy and timeline?',
      expectedPoints: [
        'Sets realistic expectations: 85-95% accuracy depending on class complexity and data quality',
        'Proposes starting with the most common intent categories for maximum impact',
        'Discusses the need for a labeled training dataset and annotation timeline',
        'Addresses confidence thresholds — route high-confidence automatically, escalate uncertain ones to humans'
      ]
    },
    {
      kind: 'client',
      personaName: 'Tom Hendricks',
      personaRole: 'CTO, HealthFirst Diagnostics',
      situation: 'Client needs NLP for medical text but is concerned about the model hallucinating or misclassifying critical information.',
      openingMessage:
        'We need to extract diagnosis codes and medication names from clinical notes. The stakes are extremely high — a misclassification could affect patient care. How do we ensure the system is safe and auditable?',
      expectedPoints: [
        'Emphasizes conservative confidence thresholds — never auto-route low-confidence predictions',
        'Proposes human-in-the-loop review for all extractions before they enter clinical workflows',
        'Discusses model explainability techniques for auditing why a classification was made',
        'Addresses regulatory considerations (FDA, HIPAA) for AI in clinical settings'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'After upgrading from transformers 4.30 to 4.35, the NER pipeline began producing duplicate entities and misaligned BIO tags. The release was deployed to staging yesterday and needs to go to production tomorrow.',
      requiredActions: [
        { action: 'Check the changelog for breaking changes in tokenization alignment', good: true, note: 'Hugging Face Transformers frequently changes tokenization behavior between versions — alignment bugs are a known issue.' },
        { action: 'Pin the transformers version and revert to the last known-good configuration', good: true, note: 'Revert first, investigate second. Staging should be back to a working state immediately.' },
        { action: 'Test the upgrade in an isolated environment with the same evaluation dataset before retrying', good: true, note: 'Never promote an untested dependency upgrade. Run the eval suite against the new version.' },
        { action: 'Assume the issue will resolve itself in production due to different data distributions', good: false, note: 'Ignoring reproducible bugs in staging is a deployment disaster waiting to happen.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Two weeks before launch, the product team requests adding a new entity type (INSURANCE_CODE) to the existing NER system. The annotated dataset has no examples of this entity type.',
      requiredActions: [
        { action: 'Assess the impact on existing entity F1 by evaluating whether the new entity overlaps with current types', good: true, note: 'New entity types can create confusion with existing ones — measure before committing to a timeline.' },
        { action: 'Propose a phased approach: launch with current entities, add INSURANCE_CODE in a fast-follow sprint', good: true, note: 'Balancing scope with deadline realism is a core engineering skill. Phased delivery is often the right call.' },
        { action: 'Start annotating INSURANCE_CODE examples immediately using active learning to maximize data efficiency', good: true, note: 'Active learning selects the most informative samples for annotation, reducing the data requirement for the new entity type.' },
        { action: 'Refuse the requirement because the dataset is too small for a new entity type', good: false, note: 'Dismissing requirements without proposing alternatives damages cross-functional trust.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain how self-attention works in BERT and why bidirectionality matters for NER tasks.',
      guidancePoints: [
        'Self-attention computes weighted relevance of every token to every other token',
        'BERT uses masked self-attention where each token attends to all other tokens in both directions',
        'Bidirectional context lets the model disambiguate entities based on surrounding words',
        'For NER, knowing both "Apple" was preceded by "the" and followed by "released" helps classify it as ORG'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What are the trade-offs between using spaCy and Hugging Face Transformers for a production NER system?',
      guidancePoints: [
        'spaCy is faster for inference with its C-based pipeline; Transformers achieve higher accuracy with larger models',
        'spaCy\'s pre-trained models are smaller and easier to deploy; Transformers models may require GPU',
        'Transformers offers access to state-of-the-art models and fine-tuning; spaCy is simpler for standard pipelines',
        'Hybrid approaches use spaCy for preprocessing and Transformers for the core classification/NER model'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your NER model performs well on news articles but poorly on social media text. How do you diagnose and fix this domain mismatch?',
      guidancePoints: [
        'Analyze error patterns — are specific entity types failing, or is it a general tokenization issue?',
        'Social media has slang, abbreviations, emojis and non-standard capitalization that break tokenization',
        'Collect and annotate domain-specific training data from social media',
        'Consider domain-adaptive pre-training or continued pre-training on unlabeled social media text',
        'Augment training data with noise injection to improve robustness'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A user submits input that causes your NER model to predict entities with confidence scores of exactly 0.5 for every token. What is happening and how do you fix it?',
      guidancePoints: [
        'Uniform 0.5 confidence suggests the model is predicting all O tokens and the softmax is evenly split',
        'Likely caused by input that is entirely out-of-distribution — garbage text, wrong encoding or adversarial input',
        'Implement input validation to detect out-of-distribution inputs before they reach the model',
        'Add a confidence threshold below which predictions are rejected and routed to human review',
        'Monitor input distribution drift to catch this proactively'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The business wants to replace the human annotation team with a fully automated labeling system using an LLM. What is your position?',
      guidancePoints: [
        'LLM-based labeling is cost-effective for initial labeling but cannot replace human judgment for ambiguous cases',
        'Human annotation remains essential for gold-standard evaluation datasets',
        'Propose a hybrid: LLM pre-labels, humans review and correct — active learning loop',
        'Quantify the quality gap between LLM labels and human labels on a sample before committing',
        'Address bias and consistency issues in LLM-generated labels'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover that the NER system is extracting patient names from public social media posts, which violates privacy policy. How do you handle this?',
      guidancePoints: [
        'Immediately flag this as a critical compliance issue — PII extraction from unauthorized sources is a policy violation',
        'Identify whether this is a model capability issue or a data pipeline issue',
        'Implement a PII filter as an input guardrail that blocks social media text from the NER pipeline',
        'Audit all historical predictions to determine if PII was stored or logged',
        'Report the incident through the proper compliance channels'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain the difference between tokenization in BERT and tokenization in spaCy to a product manager who does not have a technical background.',
      guidancePoints: [
        'Use the analogy: spaCy splits on word boundaries like a smart word splitter, BPE breaks words into meaningful sub-parts',
        'BERT sometimes splits rare words into multiple subwords, which can affect entity boundary detection',
        'Both approaches handle most common words the same way — the difference is in edge cases',
        'This technical detail matters for how entities are displayed to users and how accurate extraction is'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your NER system is 92% accurate overall but only 68% accurate on the INSURANCE_CODE entity type that the business considers critical. How do you communicate this and what do you recommend?',
      guidancePoints: [
        'Lead with the business impact: the most important entity type has the lowest performance',
        'Show concrete examples of failure cases to make the problem tangible',
        'Explain why INSURANCE_CODE is harder — rare in training data, similar to other codes',
        'Propose a focused annotation campaign targeting this entity type',
        'Set a realistic timeline and accuracy target for the improvement'
      ]
    }

  ]

}

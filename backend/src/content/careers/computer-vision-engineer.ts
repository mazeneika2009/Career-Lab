import type { CareerDef } from '../framework.js'

export const computerVisionEngineer: CareerDef = {
  slug: 'computer-vision-engineer',
  name: 'Computer Vision Engineer',
  category: 'AI & Data',
  order: 18,
  description:
    'Builds vision systems with OpenCV and deep learning — detection, segmentation and recognition deployed to production.',
  difficulty: 'Advanced',
  pathSummary:
    'Python & image fundamentals → OpenCV & classical vision → CNNs & deep learning for vision → Object detection, segmentation & production deployment.',
  mainSkills: [
    'Python',
    'OpenCV',
    'PyTorch',
    'Convolutional Neural Networks',
    'Object Detection & Segmentation',
    'Image Processing & Enhancement',
    'Model Optimization & Edge Deployment',
    'TensorFlow'
  ],
  sourcePlatforms: ['OpenCV', 'PyTorch', 'TensorFlow', 'NVIDIA Developer', 'Hugging Face'],
  companyName: 'ClearSight Technologies',
  roleTitle: 'Computer Vision Engineer',

  chapters: [
    {
      slug: 'python-image-foundations',
      stage: 'Beginner',
      title: 'Python & Image Processing Foundations',
      description: 'Core Python skills, NumPy array manipulation and the fundamentals of digital image representation.',
      topics: [
        {
          slug: 'python-for-computer-vision',
          title: 'Python for Computer Vision',
          minutes: 28,
          objectives: [
            'Write clean, idiomatic Python with type hints for vision pipelines',
            'Use pathlib, os and logging for file-heavy vision workflows',
            'Structure projects into reusable modules and packages'
          ],
          sections: [
            {
              heading: 'Python as the vision language',
              body: 'Every major vision framework — OpenCV, PyTorch, TensorFlow — publishes a Python API first. Idiomatic Python with type hints, context managers and f-strings keeps vision codebases maintainable as they grow from notebooks to production services. Understanding Python\'s object model, decorators and generators helps you write efficient data-loading and augmentation code.'
            },
            {
              heading: 'File and directory patterns',
              body: 'Vision work is file-heavy: thousands of images, annotations, model checkpoints and logs. Use pathlib for cross-platform path manipulation, os.walk or glob for recursive directory traversal, and shutil for file operations. Logging with structured output (JSON logs) replaces print statements and makes production debugging feasible.'
            },
            {
              heading: 'Project structure for vision',
              body: 'Organize code into modules: data loading, preprocessing, model definition, training, evaluation and inference. Separate configuration (YAML or dataclass) from logic. Use __init__.py to expose clean public APIs. This structure scales from a single-camera prototype to a multi-camera production deployment.'
            }
          ],
          links: [
            { title: 'The Python Tutorial', url: 'https://docs.python.org/3/tutorial/', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Official Python introduction covering syntax, data structures and modules.' },
            { title: 'pathlib — Object-oriented filesystem paths', url: 'https://docs.python.org/3/library/pathlib.html', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'Modern path manipulation for image directory traversal.' },
            { title: 'Python logging HOWTO', url: 'https://docs.python.org/3/howto/logging.html', sourceName: 'PyTorch', resourceType: 'guide', relationship: 'Setting up structured logging for vision pipeline observability.' }
          ],
          quiz: {
            prompt: 'Why prefer pathlib over os.path for image directory traversal in vision projects?',
            options: [
              'pathlib is faster for large directories',
              'pathlib provides an object-oriented API that is more readable and cross-platform',
              'pathlib automatically loads images into memory',
              'os.path does not support wildcard patterns'
            ],
            answerIndex: 1,
            explanation: 'pathlib offers an object-oriented interface with method chaining, making path operations more readable and less error-prone across operating systems.'
          }
        },
        {
          slug: 'numpy-array-operations',
          title: 'NumPy Array Operations for Images',
          minutes: 30,
          objectives: [
            'Represent images as NumPy arrays and understand shape conventions',
            'Perform vectorized pixel operations without Python loops',
            'Manipulate channels, cropping, resizing and padding with array slicing'
          ],
          sections: [
            {
              heading: 'Images as NumPy arrays',
              body: 'A grayscale image is a 2-D NumPy array of shape (H, W) where each value is a pixel intensity (0-255 for uint8). A color image is (H, W, 3) with BGR channels in OpenCV or RGB in most other libraries. Understanding this shape convention is essential — every OpenCV function, PyTorch tensor transformation and data augmentation operates on these arrays.'
            },
            {
              heading: 'Vectorized operations',
              body: 'NumPy runs element-wise operations in optimized C, making them orders of magnitude faster than Python loops. Brightness adjustment is simply img * alpha + beta. Thresholding is img > threshold. These vectorized operations form the backbone of preprocessing pipelines that process thousands of images per second.'
            },
            {
              heading: 'Array manipulation for vision',
              body: 'Slicing extracts regions of interest: img[y1:y2, x1:x2]. Transposing swaps axes for channel-first formats required by PyTorch: np.transpose(img, (2, 0, 1)). Padding adds borders for convolution: np.pad(img, ((10,10),(10,10),(0,0))). Broadcasting enables operations between arrays of different shapes, like normalizing a batch of images by a per-channel mean.'
            }
          ],
          links: [
            { title: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Essential NumPy operations for array manipulation.' },
            { title: 'NumPy Array Slicing', url: 'https://numpy.org/doc/stable/reference/arrays.indexing.html', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'Detailed guide to array indexing and slicing used for image regions.' },
            { title: 'NumPy Broadcasting', url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html', sourceName: 'PyTorch', resourceType: 'guide', relationship: 'How broadcasting enables vectorized image operations across different shapes.' }
          ],
          quiz: {
            prompt: 'A color image loaded with cv2.imread has shape (480, 640, 3). What does each dimension represent?',
            options: [
              'Width, Height, Channels',
              'Height, Width, Channels (BGR)',
              'Channels, Height, Width',
              'Batch, Height, Width'
            ],
            answerIndex: 1,
            explanation: 'OpenCV loads images as (Height, Width, Channels) in BGR order by default. Height comes first because images are stored as row-major arrays.'
          }
        },
        {
          slug: 'digital-image-representation',
          title: 'Digital Image Representation & Color Spaces',
          minutes: 27,
          objectives: [
            'Understand pixel data types, bit depth and image encoding formats',
            'Convert between color spaces: BGR, RGB, HSV, grayscale',
            'Handle common image formats and their trade-offs for vision pipelines'
          ],
          sections: [
            {
              heading: 'Pixel data types and bit depth',
              body: 'uint8 images store pixel values as 0-255, which is sufficient for display and most processing. float32 images store values in [0.0, 1.0] and are required for most neural network inputs. uint16 provides higher dynamic range for medical and scientific imaging. Choosing the right data type prevents overflow, underflow and precision loss during processing.'
            },
            {
              heading: 'Color space conversions',
              body: 'BGR is OpenCV\'s default. RGB is standard for display and deep learning. HSV/HLS separates brightness from color, making it ideal for color-based segmentation — threshold a single channel instead of three. Grayscale reduces computation for edge detection and feature extraction. Each conversion has a specific use case in the vision pipeline.'
            },
            {
              heading: 'Image formats and codecs',
              body: 'JPEG offers lossy compression with adjustable quality — good for photos but artifacts degrade edge detection. PNG provides lossless compression — essential for annotation masks and medical imaging. WebP balances quality and file size for web deployment. TIFF supports multiple pages and lossless compression for archival. Understanding format trade-offs prevents quality degradation in your pipeline.'
            }
          ],
          links: [
            { title: 'OpenCV color space conversions', url: 'https://docs.opencv.org/4.x/d8/d01/tutorial_color_spaces.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Official guide to BGR, HSV, grayscale and other color space conversions.' },
            { title: 'OpenCV image codecs', url: 'https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html', sourceName: 'OpenCV', resourceType: 'reference', relationship: 'Supported image formats and encoding parameters in OpenCV.' },
            { title: 'Pillow — Python imaging library', url: 'https://pillow.readthedocs.io/en/stable/handbook/index.html', sourceName: 'OpenCV', resourceType: 'documentation', relationship: 'Alternative image loading and format handling for Python vision workflows.' }
          ],
          quiz: {
            prompt: 'You need to segment red objects in an image regardless of lighting conditions. Which color space is most suitable?',
            options: [
              'BGR — use all three channels',
              'RGB — the standard display format',
              'HSV — threshold the Hue channel to isolate red regardless of brightness',
              'Grayscale — reduces to a single intensity channel'
            ],
            answerIndex: 2,
            explanation: 'HSV separates color (Hue) from brightness (Value), so thresholding the Hue channel isolates colors independent of lighting variations.'
          }
        }
      ]
    },
    {
      slug: 'classical-computer-vision',
      stage: 'Foundation',
      title: 'Classical Computer Vision with OpenCV',
      description: 'Edge detection, filtering, feature extraction and the algorithmic foundations that underpin modern vision systems.',
      topics: [
        {
          slug: 'image-filtering-enhancement',
          title: 'Image Filtering & Enhancement',
          minutes: 30,
          objectives: [
            'Apply blur, sharpen and edge-enhancement filters using kernel convolution',
            'Use adaptive and morphological operations for noise removal',
            'Enhance image quality with histogram equalization and CLAHE'
          ],
          sections: [
            {
              heading: 'Kernel convolution fundamentals',
              body: 'A kernel is a small matrix that slides over every pixel, computing a weighted sum of neighbors. A 3x3 averaging kernel blurs the image. A sharpening kernel subtracts a blurred version from the original. The Laplacian kernel highlights edges by computing second-order derivatives. Understanding kernel design lets you build custom filters for specific vision tasks.'
            },
            {
              heading: 'Noise reduction strategies',
              body: 'Gaussian blur smooths additive noise but also softens edges. Bilateral filtering preserves edges while smoothing flat regions — critical for preprocessing before edge detection. Median filtering removes salt-and-pepper noise without blurring edges. Morphological operations (erosion, dilation, opening, closing) clean up binary masks by removing small noise blobs and filling holes.'
            },
            {
              heading: 'Histogram equalization and CLAHE',
              body: 'Histogram equalization redistributes pixel intensities to span the full range, improving contrast in underexposed or overexposed images. CLAHE (Contrast Limited Adaptive Histogram Equalization) applies equalization to local tiles rather than the entire image, preventing over-amplification of noise. CLAHE is a standard preprocessing step for medical imaging and low-light surveillance.'
            }
          ],
          links: [
            { title: 'OpenCV image filtering', url: 'https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html', sourceName: 'OpenCV', resourceType: 'reference', relationship: 'Complete reference for blur, morphological and linear filters.' },
            { title: 'OpenCV histogram equalization', url: 'https://docs.opencv.org/4.x/d6/dc7/group__imgproc__hist.html', sourceName: 'OpenCV', resourceType: 'reference', relationship: 'Histogram calculation and equalization functions.' },
            { title: 'Bilateral filtering tutorial', url: 'https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html#ga9d7827e8498f7c0a2d199143b84ab115', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Edge-preserving smoothing for preprocessing before detection.' }
          ],
          quiz: {
            prompt: 'Why is CLAHE preferred over standard histogram equalization for medical imaging?',
            options: [
              'CLAHE is faster to compute',
              'CLAHE applies equalization locally, preventing noise amplification in uniform regions',
              'CLAHE converts images to grayscale automatically',
              'CLAHE uses deep learning for contrast adjustment'
            ],
            answerIndex: 1,
            explanation: 'CLAHE applies histogram equalization to local tiles, limiting contrast amplification per tile. This preserves detail in both dark and bright regions without over-amplifying noise globally.'
          }
        },
        {
          slug: 'edge-detection-feature-extraction',
          title: 'Edge Detection & Feature Extraction',
          minutes: 30,
          objectives: [
            'Detect edges using Sobel, Canny and Laplacian operators',
            'Extract keypoints and descriptors with SIFT, ORB and Harris corner detection',
            'Match features between images for alignment and comparison'
          ],
          sections: [
            {
              heading: 'Gradient-based edge detection',
              body: 'Edges correspond to sharp intensity changes. The Sobel operator computes first-order derivatives in x and y directions, producing gradient magnitude and direction. Canny edge detection applies Gaussian smoothing, gradient computation, non-maximum suppression and hysteresis thresholding to produce thin, well-localized edges. Canny is the gold standard for classical edge detection.'
            },
            {
              heading: 'Keypoint detection and descriptors',
              body: 'SIFT (Scale-Invariant Feature Transform) detects blobs at multiple scales and computes rotation-invariant descriptors — robust to zoom, rotation and partial occlusion. ORB (Oriented FAST and Rotated BRIEF) is a fast, patent-free alternative suitable for real-time applications. Harris corner detection identifies regions where intensity varies in multiple directions, marking stable points for tracking.'
            },
            {
              heading: 'Feature matching',
              body: 'Brute-force matching compares every descriptor pair. FLANN-based matching uses approximate nearest neighbors for speed on large descriptor sets. Lowe\'s ratio test (distance to best match < 0.75 * distance to second best) filters ambiguous matches. Good matches enable homography estimation for image stitching, augmented reality and camera calibration.'
            }
          ],
          links: [
            { title: 'Canny edge detector', url: 'https://docs.opencv.org/4.x/dd/d1a/group__imgproc__feature.html#ga04723e0c7ed4fda65fdeb070c4df9d0d', sourceName: 'OpenCV', resourceType: 'reference', relationship: 'OpenCV Canny edge detection implementation and parameters.' },
            { title: 'Feature detection and description', url: 'https://docs.opencv.org/4.x/da/d9b/tutorial_pyOrElse.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'SIFT, SURF, ORB and feature matching tutorial.' },
            { title: 'Feature matching with FLANN', url: 'https://docs.opencv.org/4.x/dc/dc3/tutorial_py_matcher.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Brute-force and FLANN-based feature matching with ratio test.' }
          ],
          quiz: {
            prompt: 'The Canny edge detector uses hysteresis thresholding with two thresholds. What is the purpose of having two thresholds instead of one?',
            options: [
              'Two thresholds make the algorithm run faster',
              'The high threshold identifies strong edges; the low threshold connects weak edges to strong ones, reducing noise while preserving edge continuity',
              'Two thresholds detect horizontal and vertical edges separately',
              'The second threshold is for color images only'
            ],
            answerIndex: 1,
            explanation: 'Hysteresis uses a high threshold to identify definite edge pixels and a low threshold to trace weak edge pixels connected to strong ones. This eliminates noisy isolated edges while maintaining edge continuity.'
          }
        },
        {
          slug: 'contour-analysis-shape-detection',
          title: 'Contour Analysis & Shape Detection',
          minutes: 28,
          objectives: [
            'Detect and analyze contours in binary images',
            'Measure shape properties: area, perimeter, circularity and bounding boxes',
            'Apply contour-based object counting and classification'
          ],
          sections: [
            {
              heading: 'Contour detection and hierarchy',
              body: 'Contours are curves joining continuous points of equal intensity in a binary image. cv2.findContours returns a list of contour points plus a hierarchy tree describing parent-child relationships between nested contours. Different retrieval modes (RETR_EXTERNAL, RETR_TREE, RETR_CCOMP) expose different levels of nesting — external-only for counting objects, full tree for analyzing nested structures.'
            },
            {
              heading: 'Shape measurement',
              body: 'cv2.contourArea computes the number of pixels inside a contour. cv2.arcLength gives the perimeter. Circularity (4π * area / perimeter²) identifies circles — values close to 1.0 are circular. cv2.boundingRect returns the smallest enclosing rectangle. cv2.minAreaRect returns a rotated bounding box. These measurements form the basis of shape classification in manufacturing QA and document analysis.'
            },
            {
              heading: 'Practical applications',
              body: 'Contour analysis counts cells in microscopy images, detects defects in manufacturing (broken shapes, missing parts), extracts text regions in document processing and identifies traffic signs in autonomous driving. Combining contour properties with simple thresholding or morphological preprocessing creates robust object counting systems without requiring deep learning.'
            }
          ],
          links: [
            { title: 'OpenCV contour features', url: 'https://docs.opencv.org/4.x/d1/d32/tutorial_py_contour_features.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Measuring contour area, perimeter, bounding rectangles and moments.' },
            { title: 'OpenCV contour properties', url: 'https://docs.opencv.org/4.x/d1/d32/tutorial_py_contour_features.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Computing circularity, aspect ratio and solidity for shape classification.' },
            { title: 'OpenCV contour detection', url: 'https://docs.opencv.org/4.x/d4/d73/tutorial_py_contours_begin.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Finding and drawing contours with different retrieval modes.' }
          ],
          quiz: {
            prompt: 'You need to count separate objects in a binary image where objects do not overlap. Which contour retrieval mode should you use?',
            options: [
              'RETR_TREE — returns the full hierarchy of all contours',
              'RETR_EXTERNAL — returns only outermost contours, one per object',
              'RETR_CCOMP — returns a two-level hierarchy',
              'RETR_LIST — returns all contours without hierarchy'
            ],
            answerIndex: 1,
            explanation: 'RETR_EXTERNAL retrieves only the outermost contours, ignoring holes and nested structures. This gives exactly one contour per separate object, making counting straightforward.'
          }
        }
      ]
    },
    {
      slug: 'deep-learning-vision',
      stage: 'Intermediate',
      title: 'Deep Learning for Computer Vision',
      description: 'Building, training and fine-tuning convolutional neural networks for classification, detection and segmentation.',
      topics: [
        {
          slug: 'cnn-architectures-fundamentals',
          title: 'CNN Architectures & Design Principles',
          minutes: 30,
          objectives: [
            'Explain how convolutional layers extract hierarchical visual features',
            'Describe key CNN architectures: LeNet, ResNet, EfficientNet and Vision Transformer',
            'Implement a custom CNN classifier using PyTorch'
          ],
          sections: [
            {
              heading: 'How convolutions learn features',
              body: 'A convolutional layer slides learnable filters across the input, producing feature maps that activate on specific patterns. Early layers detect edges and textures. Middle layers combine edges into parts — eyes, wheels, corners. Deep layers recognize whole objects — faces, cars, buildings. This hierarchical feature extraction is why CNNs outperform fully connected networks for vision: they exploit spatial locality and share parameters across the image.'
            },
            {
              heading: 'Architecture evolution',
              body: 'LeNet (1998) proved CNNs for digit recognition. AlexNet (2012) won ImageNet with dropout and ReLU. VGG showed depth matters with stacked 3x3 convolutions. ResNet introduced skip connections enabling 150+ layer training. EfficientNet scaled width, depth and resolution jointly with compound scaling. Vision Transformers (ViT) replaced convolutions with self-attention patches, achieving state-of-the-art on large datasets. Each architecture solved a specific bottleneck of its predecessor.'
            },
            {
              heading: 'Building blocks in practice',
              body: 'Convolution → BatchNorm → ReLU → Pooling is the standard block. 1x1 convolutions reduce channel dimensionality cheaply (bottleneck layers). Depthwise separable convolutions factor spatial and channel mixing for mobile efficiency. Global average pooling replaces fully connected layers, reducing parameters and preventing overfitting. Understanding these building blocks lets you read and adapt any modern architecture.'
            }
          ],
          links: [
            { title: 'PyTorch convolution layers', url: 'https://pytorch.org/docs/stable/nn.html#convolution-layers', sourceName: 'PyTorch', resourceType: 'reference', relationship: 'PyTorch Conv2d, ConvTranspose2d and other convolution modules.' },
            { title: 'Torchvision pretrained models', url: 'https://pytorch.org/vision/stable/models.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Pre-trained ResNet, EfficientNet, ViT and other architectures ready for fine-tuning.' },
            { title: 'Papers With Code — Image Classification', url: 'https://paperswithcode.com/task/image-classification', sourceName: 'Hugging Face', resourceType: 'reference', relationship: 'Leaderboard and implementations of state-of-the-art classification architectures.' }
          ],
          quiz: {
            prompt: 'Why do ResNet skip connections enable training of very deep networks (100+ layers)?',
            options: [
              'Skip connections reduce the number of parameters',
              'Skip connections allow gradients to flow directly through identity mappings, mitigating the vanishing gradient problem',
              'Skip connections replace batch normalization',
              'Skip connections make the network wider, not deeper'
            ],
            answerIndex: 1,
            explanation: 'Skip connections create shortcut paths for gradients during backpropagation, preventing them from vanishing through many layers. This allows gradients to reach early layers even in 150+ layer networks.'
          }
        },
        {
          slug: 'transfer-learning-fine-tuning',
          title: 'Transfer Learning & Fine-tuning',
          minutes: 30,
          objectives: [
            'Load and adapt pre-trained models for domain-specific tasks',
            'Apply fine-tuning strategies: feature extraction, gradual unfreezing and learning rate scheduling',
            'Build a data augmentation pipeline for robust vision models'
          ],
          sections: [
            {
              heading: 'Why transfer learning works',
              body: 'Models pre-trained on ImageNet learn general visual features — edges, textures, shapes — that transfer to almost any vision task. Instead of training from scratch (requiring millions of images), you replace the final classification layer and train only the new head on your small dataset. This achieves competitive accuracy with 100x fewer images and 10x less compute.'
            },
            {
              heading: 'Fine-tuning strategies',
              body: 'Feature extraction freezes all pre-trained layers and trains only the new head — fast and safe for small datasets. Gradual unfreezing unfreezes layers from top to bottom, allowing deeper layers (general features) to adapt slowly while early task-specific layers learn quickly. Discriminative learning rates apply smaller rates to pre-trained layers and larger rates to new layers. Learning rate warmup and cosine annealing prevent catastrophic forgetting of pre-trained knowledge.'
            },
            {
              heading: 'Data augmentation for vision',
              body: 'Random horizontal flips, rotations (±15°), color jitter and random crops force the model to learn invariant features. CutMix and MixUp blend images and labels, improving generalization. RandAugment automatically selects and tunes augmentation operations per epoch. Albumentations provides a fast, composable augmentation library optimized for speed. Augmentation is the single most effective regularization for vision models with limited data.'
            }
          ],
          links: [
            { title: 'PyTorch transfer learning tutorial', url: 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html', sourceName: 'PyTorch', resourceType: 'tutorial', relationship: 'Step-by-step guide to fine-tuning pre-trained models in PyTorch.' },
            { title: 'Torchvision transforms', url: 'https://pytorch.org/vision/stable/transforms.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Built-in image transforms and augmentation operations.' },
            { title: 'Albumentations documentation', url: 'https://albumentations.ai/docs/', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'High-performance image augmentation library for training pipelines.' }
          ],
          quiz: {
            prompt: 'You have only 500 labeled images for a 10-class classification problem. What is the best fine-tuning strategy?',
            options: [
              'Train a large CNN from scratch with aggressive augmentation',
              'Load a pre-trained model, freeze all layers and train only the final classification layer',
              'Use a randomly initialized Vision Transformer',
              'Skip fine-tuning and use k-nearest neighbors on raw pixels'
            ],
            answerIndex: 1,
            explanation: 'With only 500 images, training from scratch will overfit. Feature extraction with a pre-trained model leverages general visual features learned from millions of images, achieving strong accuracy with minimal data.'
          }
        },
        {
          slug: 'object-detection-segmentation',
          title: 'Object Detection & Segmentation Models',
          minutes: 30,
          objectives: [
            'Understand one-stage vs two-stage detection architectures (YOLO, Faster R-CNN)',
            'Implement object detection inference using pre-trained models',
            'Explain semantic, instance and panoptic segmentation approaches'
          ],
          sections: [
            {
              heading: 'Detection architectures',
              body: 'Two-stage detectors (Faster R-CNN) first propose regions of interest, then classify and refine bounding boxes — accurate but slower. One-stage detectors (YOLO, SSD) predict bounding boxes and classes in a single pass — faster and suitable for real-time. Anchor-free detectors (CenterNet, FCOS) predict object centers and sizes directly, eliminating anchor box tuning. YOLOv8 combines speed and accuracy, dominating practical deployment.'
            },
            {
              heading: 'Detection metrics and post-processing',
              body: 'IoU (Intersection over Union) measures bounding box overlap — a detection is correct if IoU with ground truth exceeds 0.5. mAP (mean Average Precision) evaluates detection across all classes and IoU thresholds. Non-maximum suppression (NMS) removes duplicate detections by keeping the highest-confidence box and suppressing overlapping boxes above an IoU threshold. Confidence thresholds trade precision for recall.'
            },
            {
              heading: 'Segmentation approaches',
              body: 'Semantic segmentation assigns a class label to every pixel — FPN and DeepLab architectures are common choices. Instance segmentation detects individual object instances and segments each separately — Mask R-CNN adds a mask branch to Faster R-CNN. Panoptic segmentation combines both: each pixel gets a class label and an instance ID. These outputs enable pixel-level understanding for autonomous driving, medical imaging and robotics.'
            }
          ],
          links: [
            { title: 'Ultralytics YOLOv8', url: 'https://docs.ultralytics.com/', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'YOLOv8 for object detection, segmentation, classification and pose estimation.' },
            { title: 'Torchvision detection models', url: 'https://pytorch.org/vision/stable/models/detection.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'Faster R-CNN, RetinaNet, FCOS and other detection models in torchvision.' },
            { title: 'Hugging Face segmentation models', url: 'https://huggingface.co/docs/transformers/main/en/main_classes/pipelines#transformers.pipeline', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Pre-trained segmentation models accessible via Hugging Face pipelines.' }
          ],
          quiz: {
            prompt: 'In object detection, what does Non-Maximum Suppression (NMS) accomplish?',
            options: [
              'It improves the resolution of the input image',
              'It removes redundant overlapping detections by keeping only the highest-confidence box per object',
              'It increases the number of detected objects',
              'It converts detection bounding boxes into segmentation masks'
            ],
            answerIndex: 1,
            explanation: 'NMS suppresses overlapping bounding boxes that likely detect the same object, keeping only the highest-confidence detection. This eliminates duplicate predictions while preserving distinct objects.'
          }
        }
      ]
    },
    {
      slug: 'production-vision-systems',
      stage: 'Advanced',
      title: 'Production Vision Systems & Deployment',
      description: 'Optimizing models, building real-time pipelines and deploying vision systems to edge and cloud.',
      topics: [
        {
          slug: 'model-optimization-inference',
          title: 'Model Optimization & Inference Acceleration',
          minutes: 30,
          objectives: [
            'Quantize and prune models for edge deployment without significant accuracy loss',
            'Optimize inference with TensorRT, ONNX Runtime and OpenVINO',
            'Measure and profile inference latency, throughput and memory usage'
          ],
          sections: [
            {
              heading: 'Quantization techniques',
              body: 'INT8 quantization reduces model size by 4x and speeds inference by 2-3x with 1-2% accuracy loss on most tasks. Post-training quantization (PTQ) converts weights after training with minimal calibration data. Quantization-aware training (QAT) simulates quantization during training, preserving accuracy on sensitive models. FP16 half-precision halves memory and doubles throughput on modern GPUs with negligible accuracy impact.'
            },
            {
              heading: 'Model export and optimization',
              body: 'ONNX format provides a framework-agnostic intermediate representation. ONNX Runtime applies graph optimizations: operator fusion, constant folding and layout transformations. TensorRT fuses layers and selects optimal CUDA kernels for NVIDIA GPUs, achieving 2-5x speedup. OpenVINO optimizes for Intel CPUs, integrated GPUs and VPUs. Exporting to the right format for your deployment target is critical for production performance.'
            },
            {
              heading: 'Profiling and benchmarking',
              body: 'Profile end-to-end pipeline latency: preprocessing, model inference and postprocessing. Use torch.profiler or NVIDIA Nsight Systems to identify bottlenecks — often data loading or preprocessing, not the model itself. Measure throughput (images/second), p95 latency and GPU memory utilization under realistic batch sizes. Benchmark with mixed precision (FP16) and different batch sizes to find the optimal operating point.'
            }
          ],
          links: [
            { title: 'TensorRT developer guide', url: 'https://developer.nvidia.com/tensorrt', sourceName: 'NVIDIA Developer', resourceType: 'documentation', relationship: 'NVIDIA TensorRT for high-performance deep learning inference.' },
            { title: 'ONNX Runtime documentation', url: 'https://onnxruntime.ai/docs/', sourceName: 'NVIDIA Developer', resourceType: 'documentation', relationship: 'Cross-platform ONNX model inference with optimization.' },
            { title: 'PyTorch quantization', url: 'https://pytorch.org/docs/stable/quantization.html', sourceName: 'PyTorch', resourceType: 'documentation', relationship: 'PyTorch quantization tools for INT8 and mixed-precision deployment.' }
          ],
          quiz: {
            prompt: 'After quantizing a detection model from FP32 to INT8, mAP drops from 0.85 to 0.72. What should you try first?',
            options: [
              'Deploy the INT8 model anyway — accuracy does not matter',
              'Use quantization-aware training (QAT) to recover accuracy lost during naive post-training quantization',
              'Switch to a completely different model architecture',
              'Remove all batch normalization layers'
            ],
            answerIndex: 1,
            explanation: 'A 13-point mAP drop indicates the model is sensitive to quantization. QAT simulates quantization during training, allowing the model to adapt and recover most lost accuracy while still benefiting from INT8 inference speed.'
          }
        },
        {
          slug: 'video-processing-realtime',
          title: 'Video Processing & Real-time Systems',
          minutes: 30,
          objectives: [
            'Efficiently decode, process and encode video streams with OpenCV and FFmpeg',
            'Implement real-time object tracking across video frames',
            'Design low-latency pipelines for live camera feeds'
          ],
          sections: [
            {
              heading: 'Video I/O and frame processing',
              body: 'cv2.VideoCapture reads frames from video files, RTSP streams or webcams. Each frame is a NumPy array processed independently or temporally. cv2.VideoWriter encodes processed frames back to video. FFmpeg provides hardware-accelerated decoding and encoding. Understanding frame rates (30fps = 33ms per frame budget) and resolution scaling is essential for meeting real-time constraints.'
            },
            {
              heading: 'Object tracking',
              body: 'Detection per frame is expensive for video. Tracking algorithms (CSRT, KCF, MOSSE) follow objects between frames using appearance or motion models — much faster than re-detecting every frame. Detect every N frames and track in between for a speed-accuracy balance. Deep learning trackers (Siamese networks, SORT, DeepSORT) combine appearance embeddings with motion prediction for robust multi-object tracking across occlusions.'
            },
            {
              heading: 'Real-time pipeline architecture',
              body: 'Separate video capture, preprocessing, inference and postprocessing into parallel threads or processes. Use a producer-consumer pattern: capture frames into a queue, process them in a worker thread and display results in a main thread. GPU preprocessing (CUDA, torch.cuda) and asynchronous data transfers overlap computation with I/O. Target a consistent frame budget: 33ms for 30fps, 16ms for 60fps.'
            }
          ],
          links: [
            { title: 'OpenCV VideoCapture', url: 'https://docs.opencv.org/4.x/d8/dfe/classcv_1_1VideoCapture.html', sourceName: 'OpenCV', resourceType: 'reference', relationship: 'Reading video files and camera streams frame by frame.' },
            { title: 'OpenCV tracking API', url: 'https://docs.opencv.org/4.x/d9/df1/tutorial_tracking_by_detection.html', sourceName: 'OpenCV', resourceType: 'tutorial', relationship: 'Object tracking algorithms for video sequences.' },
            { title: 'FFmpeg video encoding', url: 'https://ffmpeg.org/documentation.html', sourceName: 'OpenCV', resourceType: 'reference', relationship: 'Hardware-accelerated video decoding and encoding for production pipelines.' }
          ],
          quiz: {
            prompt: 'You need to track 50 objects in a 30fps video stream. Running full object detection on every frame takes 200ms. What is the best strategy?',
            options: [
              'Reduce the video resolution until detection fits in 33ms',
              'Detect objects every 5th frame and use a tracking algorithm (CSRT or DeepSORT) for intermediate frames',
              'Run 50 separate detection models in parallel',
              'Skip frames randomly to reduce average computation'
            ],
            answerIndex: 1,
            explanation: 'Detection-track hybrid pipelines detect at a lower frequency (every N frames) and use lightweight tracking algorithms to follow objects between detections, keeping the per-frame budget within 33ms.'
          }
        },
        {
          slug: 'vision-system-architecture-mlops',
          title: 'Vision System Architecture & MLOps',
          minutes: 30,
          objectives: [
            'Design scalable vision system architectures for cloud and edge deployment',
            'Implement model versioning, data versioning and experiment tracking',
            'Monitor model performance drift and trigger retraining pipelines'
          ],
          sections: [
            {
              heading: 'System architecture patterns',
              body: 'Edge-first architecture runs inference on local devices (cameras, gateways) and sends only results to the cloud — minimal latency and bandwidth. Cloud-first architecture streams video to centralized GPU servers for powerful but higher-latency processing. Hybrid splits lightweight detection on edge and sends regions of interest to the cloud for detailed analysis. Choose based on latency requirements, bandwidth constraints and privacy regulations.'
            },
            {
              heading: 'MLOps for vision',
              body: 'MLflow and Weights & Biases track experiments, hyperparameters and metrics. DVC (Data Version Control) versions datasets and model artifacts alongside code. Model registries store versioned models with stage transitions (staging → production → archived). Automated retraining pipelines trigger on performance degradation or new data arrival. Each component ensures reproducibility and rollback capability.'
            },
            {
              heading: 'Monitoring and drift detection',
              body: 'Vision models degrade when real-world data diverges from training data (domain shift). Monitor prediction confidence distributions, class balance and input data statistics. Alert when confidence drops below thresholds or when image quality degrades (blur, lighting changes). Shadow deployment compares new model outputs against production model outputs on live traffic before promotion. Automated alerts trigger human review when anomalies are detected.'
            }
          ],
          links: [
            { title: 'NVIDIA DeepStream SDK', url: 'https://developer.nvidia.com/deepstream-sdk', sourceName: 'NVIDIA Developer', resourceType: 'documentation', relationship: 'NVIDIA platform for multi-camera video analytics at scale.' },
            { title: 'TensorFlow Lite deployment', url: 'https://www.tensorflow.org/lite/guide', sourceName: 'TensorFlow', resourceType: 'guide', relationship: 'Deploying vision models to mobile and edge devices with TensorFlow Lite.' },
            { title: 'Hugging Face model hub', url: 'https://huggingface.co/docs/hub/index', sourceName: 'Hugging Face', resourceType: 'documentation', relationship: 'Model hosting, versioning and sharing for collaborative vision projects.' }
          ],
          quiz: {
            prompt: 'Your production detection model\'s average confidence has dropped from 0.92 to 0.71 over the past week. What is the most likely cause?',
            options: [
              'The model weights corrupted spontaneously',
              'Domain shift: incoming images differ from training data (new camera angle, lighting, weather)',
              'The GPU hardware is failing',
              'The model was retrained on too much data'
            ],
            answerIndex: 1,
            explanation: 'A gradual confidence decline indicates domain shift — the distribution of incoming images has drifted from the training distribution. This requires monitoring, data collection and potential model retraining on the new data distribution.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Real-time Object Detection & Tracking Pipeline',
    coverage: [
      'OpenCV Image Processing',
      'CNN-based Object Detection',
      'Real-time Video Processing',
      'Model Optimization',
      'System Architecture'
    ],
    brief:
      'Build an end-to-end real-time object detection and tracking system that reads from a camera or video stream, detects objects using a pre-trained YOLO model, tracks them across frames, logs detections with timestamps and exports annotated video. Include model optimization for edge deployment and a monitoring dashboard.',
    requirements: [
      'Video input handling: webcam, video file and RTSP stream support',
      'Pre-trained YOLO model for multi-class object detection',
      'Object tracking across frames using DeepSORT or ByteTrack',
      'Annotated output video with bounding boxes, labels and tracking IDs',
      'Performance monitoring: FPS counter, latency breakdown (preprocessing, inference, postprocessing)',
      'Model export to ONNX or TensorRT format with benchmarking',
      'Logging of detection counts, confidence scores and frame timestamps to a structured format'
    ],
    expectedOutput:
      'A working Python application with modular source code, an annotated output video showing tracked objects with unique IDs, and a performance report comparing FP32 vs optimized model latency and throughput.',
    rubric: [
      { skill: 'OpenCV & Video Processing', weight: 20, criteria: 'Correct frame capture, encoding and display across multiple input types' },
      { skill: 'Object Detection', weight: 25, criteria: 'Accurate detection with appropriate confidence thresholds and NMS' },
      { skill: 'Tracking & Temporal Logic', weight: 20, criteria: 'Consistent track IDs across frames, handling of occlusions and exits' },
      { skill: 'Optimization & Performance', weight: 20, criteria: 'Successful model export with measurable speedup and profiling data' },
      { skill: 'Code Quality & Architecture', weight: 15, criteria: 'Modular structure, clean separation of concerns, proper error handling' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Image Classification Pipeline with Transfer Learning',
      stage: 'Beginner',
      objective: 'Build a complete image classification pipeline using a pre-trained ResNet model, including data loading, augmentation, training and evaluation.',
      requirements: [
        'Load and preprocess a dataset of at least 1000 images across 5 classes',
        'Implement data augmentation: random flips, color jitter and random crops',
        'Fine-tune a pre-trained ResNet-18 with a custom classification head',
        'Evaluate with accuracy, precision, recall and confusion matrix',
        'Visualize misclassified examples with explanations'
      ],
      skillsEvaluated: ['PyTorch', 'Transfer Learning', 'Data Augmentation', 'Evaluation Metrics'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit a Jupyter notebook or Python module with the complete training pipeline, evaluation metrics and visualizations of model performance.',
        textLabel: 'Classification pipeline report',
        minTextLength: 1000,
        linkLabels: ['Trained model checkpoint']
      }
    },
    {
      title: 'Multi-class Object Detection Dataset & Training',
      stage: 'Intermediate',
      objective: 'Create an annotated object detection dataset, train a YOLO model and evaluate detection performance with standard metrics.',
      requirements: [
        'Collect and annotate at least 200 images across 3 object classes using bounding boxes',
        'Split data into train/validation/test sets (70/15/15)',
        'Train YOLOv8 on the custom dataset with hyperparameter tuning',
        'Evaluate mAP@50, mAP@50:95, precision and recall',
        'Compare training runs with different augmentations and image sizes'
      ],
      skillsEvaluated: ['Object Detection', 'Data Annotation', 'YOLO', 'mAP Evaluation'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the annotated dataset, training configuration, evaluation metrics and a comparison analysis of different training runs.',
        textLabel: 'Detection training report',
        minTextLength: 1200,
        linkLabels: ['Annotated dataset', 'Evaluation results']
      }
    },
    {
      title: 'Edge Deployment Optimization Benchmark',
      stage: 'Advanced',
      objective: 'Optimize a trained detection model for edge deployment and benchmark quantized, pruned and ONNX-exported variants against the original.',
      requirements: [
        'Export a trained model to ONNX format with correct input/output specs',
        'Apply INT8 quantization using calibration data and measure accuracy impact',
        'Run benchmark comparisons: FP32 PyTorch vs ONNX Runtime vs TensorRT',
        'Measure latency, throughput (images/second) and model size across variants',
        'Write an optimization recommendation with accuracy-speed trade-off analysis'
      ],
      skillsEvaluated: ['Model Optimization', 'Quantization', 'TensorRT', 'Performance Profiling'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit benchmark code, a comparison table of all model variants with latency/throughput/accuracy/size metrics, and a written recommendation for the optimal deployment format.',
        textLabel: 'Optimization benchmark report',
        minTextLength: 1500,
        linkLabels: ['Benchmark results', 'Exported model files']
      }
    }
  ],

  simTasks: [
    {
      title: 'Production detection accuracy degradation',
      context: 'Your deployed face detection system that worked perfectly in controlled office lighting is now deployed in a warehouse with harsh overhead lighting and frequent occlusions. Detection accuracy has dropped from 96% to 71% and false positives are triggering incorrect access control events.',
      requirements: [
        'Analyze the root cause: lighting invariance, occlusion handling and domain shift',
        'Propose preprocessing enhancements (CLAHE, gamma correction) for challenging lighting',
        'Recommend model improvements: data augmentation for lighting, multi-scale detection',
        'Design a validation protocol with warehouse-specific test data before re-deployment'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'Root cause analysis, preprocessing pipeline with code, model improvement plan and validation protocol with warehouse test set specification.',
      skills: ['OpenCV', 'Image Enhancement', 'Domain Adaptation', 'Testing']
    },
    {
      title: 'Evaluate Vision Transformer vs CNN for defect detection',
      context: 'The quality assurance team wants to know if Vision Transformers (ViT) would outperform the current EfficientNet-based defect detection model on their manufacturing line. You need to evaluate both architectures on the company\'s defect dataset.',
      requirements: [
        'Set up a fair comparison: same data splits, augmentation and training budget',
        'Train both EfficientNet-B0 and ViT-Base on the defect dataset',
        'Compare mAP, inference latency and model size',
        'Evaluate robustness: test with augmented data simulating lighting and angle variations',
        'Provide a deployment recommendation based on accuracy and latency constraints'
      ],
      priority: 'high',
      dueDayOffset: 7,
      expectedOutput: 'Comparison report with training curves, evaluation metrics, robustness analysis and deployment recommendation.',
      skills: ['PyTorch', 'CNN vs ViT', 'Benchmarking', 'Model Selection']
    },
    {
      title: 'Real-time multi-camera monitoring system design',
      context: 'A retail client wants to deploy 16 security cameras with real-time people counting and zone occupancy tracking across four store zones. The system must process all 16 streams at 15fps with under 100ms end-to-end latency on a single GPU server.',
      requirements: [
        'Design the system architecture for 16-camera concurrent processing',
        'Propose a model choice balancing accuracy and inference speed for the hardware budget',
        'Design the threading/processing pipeline to meet the 15fps requirement',
        'Define the data flow: camera capture → inference → aggregation → dashboard',
        'Specify the hardware requirements and scaling strategy for additional cameras'
      ],
      priority: 'normal',
      dueDayOffset: 10,
      expectedOutput: 'Architecture design document with system diagram, model selection rationale, threading architecture, latency budget breakdown and hardware specification.',
      skills: ['System Architecture', 'Real-time Processing', 'Model Selection', 'Capacity Planning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Sarah Kim',
      personaRole: 'MLOps Engineer',
      situation: 'Debating whether to run vision inference on edge devices (Jetson Nano) versus streaming video to a cloud GPU server for a 50-camera deployment.',
      openingMessage:
        'The infrastructure team wants to stream all 50 camera feeds to our cloud GPU cluster, but I\'m worried about bandwidth costs and latency. The edge option with Jetson Nanos is appealing but we\'d have to manage 50 devices. What do you think?',
      expectedPoints: [
        'Quantifies bandwidth cost: 50 streams at 1080p = ~500 Mbps continuous upload',
        'Evaluates latency differences: edge inference is sub-10ms vs 50-200ms cloud round-trip',
        'Considers device management burden of 50 Jetson Nanos (updates, monitoring, failures)',
        'Proposes a hybrid architecture: lightweight detection on edge, complex analysis in cloud'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Johnson',
      personaRole: 'Backend Engineer',
      situation: 'Integration discussion about how the vision inference service connects to the existing microservice architecture.',
      openingMessage:
        'I need to understand how your vision service will integrate with our existing gRPC-based microservice stack. What does the request/response contract look like, and how do we handle the image data efficiently?',
      expectedPoints: [
        'Defines a protobuf schema for detection results with bounding boxes, classes and confidence',
        'Addresses image transport: base64 encoding vs binary payload vs object storage reference',
        'Discusses async processing for batch requests vs streaming for real-time',
        'Provides latency SLAs and error handling contract for downstream consumers'
      ]
    },
    {
      kind: 'client',
      personaName: 'Dr. Rachel Torres',
      personaRole: 'Director of Radiology, MedFirst Imaging',
      situation: 'Client wants to deploy a chest X-ray analysis system but is concerned about regulatory approval and clinical validation.',
      openingMessage:
        'Our radiologists are interested in the AI-assisted screening tool, but the compliance team needs to understand the validation process. How do we prove this system is safe enough for clinical use?',
      expectedPoints: [
        'Outlines the validation framework: sensitivity, specificity and AUC on a clinical test set',
        'Discusses regulatory pathways: FDA 510(k) for Class II medical devices',
        'Explains the need for prospective clinical trials, not just retrospective data',
        'Proposes a shadow mode deployment where AI runs alongside radiologists without autonomous decisions'
      ]
    },
    {
      kind: 'client',
      personaName: 'Jake Morrison',
      personaRole: 'VP of Operations, AutoFact Manufacturing',
      situation: 'Client reports false positive detections are halting the assembly line every 15 minutes, costing thousands per hour.',
      openingMessage:
        'Your defect detection system is flagging good parts as defective 12 times per hour. Each false positive triggers an assembly line stop that costs us $3,000. We need to reduce false positives dramatically without missing real defects.',
      expectedPoints: [
        'Analyzes the precision-recall trade-off and current confidence threshold setting',
        'Proposes raising the detection threshold to reduce false positives at the cost of some recall',
        'Recommends a two-stage pipeline: high-recall screening → high-precision confirmation',
        'Suggests collecting labeled false positive examples for targeted model improvement'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'The production object detection model started producing inconsistent bounding box coordinates after a PyTorch version upgrade from 1.13 to 2.0. Boxes are shifted by a few pixels in some images, causing downstream tracking failures.',
      requiredActions: [
        { action: 'Compare inference outputs between PyTorch 1.13 and 2.0 on the same test images to quantify the shift', good: true, note: 'Reproduce the issue with controlled inputs before investigating causes.' },
        { action: 'Check if interpolation mode changes in torchvision transforms caused the pixel shift', good: true, note: 'torchvision 0.15 changed default interpolation from NEAREST to BILINEAR in some transforms.' },
        { action: 'Roll back to PyTorch 1.13 immediately while investigating to restore production service', good: true, note: 'Restore service first; root-cause analysis can follow.' },
        { action: 'Re-train the model on PyTorch 2.0 to adapt to the new behavior', good: false, note: 'Re-training before understanding the root cause may mask the real issue and waste compute.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Midway through deploying a people-counting system for a retail client, the client adds a new requirement: the system must also detect when customers are wearing face masks for a health compliance feature.',
      requiredActions: [
        { action: 'Assess whether the existing detection model can be extended with a mask classification head', good: true, note: 'Extending an existing model is often more efficient than building from scratch.' },
        { action: 'Research pre-trained mask detection models and evaluate fit for the client\'s use case', good: true, note: 'Leverage existing work — mask detection models are well-established since 2020.' },
        { action: 'Negotiate timeline adjustment since this is a scope expansion beyond the original contract', good: true, note: 'Scope changes require timeline and budget adjustment to maintain quality and profitability.' },
        { action: 'Implement the mask detection as a simple post-processing rule based on face bounding box overlap', good: false, note: 'Rule-based approaches are brittle; a proper classifier trained on relevant data is more reliable.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between semantic segmentation and instance segmentation. When would you choose one over the other?',
      guidancePoints: [
        'Semantic segmentation labels every pixel with a class but does not distinguish between instances',
        'Instance segmentation detects and segments each individual object separately',
        'Panoptic segmentation combines both: class labels + instance IDs for every pixel',
        'Use semantic for terrain/sky classification; instance for counting or tracking distinct objects',
        'Medical imaging often uses semantic (cell nuclei); autonomous driving uses panoptic'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the vanishing gradient problem and how do skip connections in ResNet address it?',
      guidancePoints: [
        'Gradients shrink exponentially as they propagate backward through many layers',
        'Early layers receive negligibly small gradients and stop learning effectively',
        'Skip connections create identity shortcuts that allow gradients to flow directly to early layers',
        'The network learns residual functions: F(x) + x, making it easier to learn identity mappings',
        'This enables training of networks with 100+ layers without gradient degradation'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your object detection model performs well on daytime images but fails on nighttime footage. How do you diagnose and fix this domain shift?',
      guidancePoints: [
        'Collect nighttime test data and quantify the performance gap with metrics',
        'Analyze failure modes: are detections missing entirely or producing wrong classes?',
        'Apply preprocessing: CLAHE, gamma correction or histogram equalization for low-light images',
        'Augment training data with brightness/contrast jitter and synthetic night images',
        'Consider domain adaptation techniques or fine-tuning on a small nighttime dataset'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A detection model processes 20 images per second but the application needs 30fps. Walk through your optimization approach.',
      guidancePoints: [
        'Profile the pipeline to identify bottlenecks: preprocessing, GPU transfer, inference or postprocessing',
        'Try FP16 half-precision inference for near-free speedup on modern GPUs',
        'Export to TensorRT or ONNX Runtime for optimized inference kernels',
        'Reduce input resolution if the task allows it (e.g., 640x480 instead of 1920x1080)',
        'Consider model pruning or switching to a lighter architecture (YOLOv8n vs YOLOv8m)'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A client asks you to build a facial recognition system for employee access control. What concerns do you raise before starting?',
      guidancePoints: [
        'Privacy regulations: GDPR, BIPA and local biometric laws require explicit consent and data minimization',
        'Bias and fairness: facial recognition systems have documented accuracy disparities across demographics',
        'Alternative approaches: badge/PIN systems are simpler, cheaper and avoid biometric data liability',
        'If proceeding, discuss data retention, encryption, right to deletion and opt-out mechanisms',
        'Recommend bias testing across demographic groups before deployment'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You have a choice between training a custom model from scratch versus using a pre-trained model from Hugging Face for a defect detection task. How do you decide?',
      guidancePoints: [
        'Pre-trained models save weeks of compute and data collection for most vision tasks',
        'Custom training is justified when domain is very different from ImageNet (medical, satellite, industrial)',
        'Fine-tuning a pre-trained model on domain data often outperforms training from scratch with limited data',
        'Consider data availability: <1000 images strongly favors transfer learning',
        'Evaluate: is the defect visually similar to ImageNet objects or completely novel?'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical factory manager why their new AI defect detection system occasionally misses defects.',
      guidancePoints: [
        'Use an analogy: the AI is like a trained inspector who catches 95 out of 100 defects but occasionally has blind spots',
        'No AI system achieves 100% accuracy — this is a fundamental property of machine learning',
        'Explain the precision-recall trade-off: catching more defects means more false alarms, and vice versa',
        'Describe concrete improvements: more training data, threshold tuning and human-in-the-loop review',
        'Present the system as augmentation of human inspectors, not a replacement, to build trust'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your team lead asks you to write a technical decision record explaining why you chose YOLOv8 over Faster R-CNN for the production detection system.',
      guidancePoints: [
        'State the problem: real-time multi-camera detection with <50ms latency requirement',
        'Present the trade-off: Faster R-CNN has slightly higher mAP but 3x slower inference',
        'Show benchmark data: YOLOv8m achieves 0.82 mAP at 12ms vs Faster R-CNN at 0.85 mAP at 35ms',
        'Discuss deployment considerations: TensorRT optimization, INT8 quantization compatibility',
        'Conclude with the recommendation and the specific conditions under which you would revisit the choice'
      ]
    }

  ]

}

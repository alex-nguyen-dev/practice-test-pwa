# AWS Certified AI Practitioner

**Exam:** AIF-C01 | **Duration:** 120 minutes | **Questions:** 65 | **Cost:** ~$150

These notes are optimized for exam review. They summarize concepts, AWS services, when to use each service, and common comparison points.

---

## 1. Exam Orientation

- Certification: AWS Certified AI Practitioner, exam code AIF-C01.
- Focus: AI, ML, generative AI, AWS AI services, responsible AI, security, governance, and basic AWS cloud concepts.
- Less focus: deep AWS architecture, deep ML math, model implementation details.
- Study strategy: know service use cases, service differences, lifecycle terms, security controls, and responsible AI risks.

## 2. AI, ML, Deep Learning, and Generative AI

### Core Definitions

| Term | Meaning | Exam reminder |
| --- | --- | --- |
| Artificial Intelligence | Broad field of systems that perform tasks associated with human intelligence. | AI is the umbrella term. |
| Machine Learning | AI method where systems learn from data instead of explicit rules. | Needs data and makes predictions. |
| Deep Learning | ML using neural networks with multiple layers. | Used for complex patterns like vision and NLP. |
| Generative AI | Deep learning subset that creates new content such as text, images, audio, video, or code. | Usually powered by foundation models. |

### AI vs ML

- AI can include rule-based systems. Example: expert systems that use manually defined rules.
- ML learns from data and generalizes to new inputs.
- Deterministic problems should usually be solved with normal code, not ML.

### Common AI Use Cases

- Speech recognition and text-to-speech.
- Image recognition, object detection, and content moderation.
- Translation and transcription.
- Fraud detection.
- Recommendations and personalization.
- Intelligent document processing.
- Chatbots and virtual assistants.
- Code suggestions and developer assistance.

## 3. Data Concepts

### Data Quality

- Good models require good data.
- "Garbage in, garbage out" is important for the exam.
- Training data is one of the most important parts of ML success.

### Labeled vs Unlabeled Data

| Data type | Description | Used for |
| --- | --- | --- |
| Labeled data | Inputs include known output labels. | Supervised learning. |
| Unlabeled data | Inputs do not include labels. | Unsupervised learning and pattern discovery. |

### Structured vs Unstructured Data

| Data type | Examples | Notes |
| --- | --- | --- |
| Structured | Tables, spreadsheets, databases, time series. | Rows and columns, easier for traditional ML. |
| Unstructured | Text, PDFs, images, audio, video. | Often needs NLP, computer vision, or document AI. |

### Features

- Features are input variables used by an ML model.
- Feature engineering creates, transforms, or extracts useful variables from raw data.
- Example: convert `BirthDate` into `Age`.

## 4. ML Learning Types

| Learning type | Goal | Examples |
| --- | --- | --- |
| Supervised learning | Learn from labeled examples. | Classification, regression. |
| Unsupervised learning | Find patterns in unlabeled data. | Clustering, anomaly detection, topic grouping. |
| Reinforcement learning | Learn by taking actions and receiving rewards. | Game AI, robotics, RLHF. |

### Classification vs Regression

- Classification predicts a category, such as spam vs not spam or dog vs cat.
- Regression predicts a continuous value, such as price, score, or demand.

### Overfitting

Overfitting means the model performs well on training data but poorly on new data.

Causes:

- Training data is too small.
- Training data is not representative.
- Model is too complex.
- Model trains too long.

Mitigations:

- Add more training data.
- Use data augmentation.
- Use early stopping.
- Tune hyperparameters.
- Increase regularization.
- Use ensemble methods.

### Hyperparameters

Hyperparameters are settings chosen before training.

- Learning rate: step size when updating model weights.
- Batch size: number of examples used per training update.
- Epochs: number of passes over the full training set.
- Regularization: controls model complexity and helps reduce overfitting.
- SageMaker Automatic Model Tuning helps tune hyperparameters.

## 5. Model Evaluation

### Classification Metrics

| Metric | Meaning |
| --- | --- |
| Accuracy | Overall ratio of correct predictions. |
| Precision | Of predicted positives, how many were actually positive. |
| Recall / Sensitivity | Of actual positives, how many the model found. |
| Specificity | Of actual negatives, how many the model correctly rejected. |
| F1 score | Balance between precision and recall. |
| AUC-ROC | Compares true positive rate against false positive rate across thresholds. |

Exam tips:

- Use precision when false positives are costly.
- Use recall when missing a positive case is costly.
- Confusion matrices support classification evaluation.

### Regression Metrics

| Metric | Meaning |
| --- | --- |
| MAE | Mean absolute error between predicted and actual values. |
| MAPE | Mean absolute percentage error. |
| RMSE | Root mean squared error; penalizes larger errors more. |
| R squared | How much variance is explained by the model. Closer to 1 is usually better. |

### Inference Types

| Type | Use when |
| --- | --- |
| Real-time inference | Low latency responses are needed, such as chatbots. |
| Batch inference | Large volumes can be processed together, latency is less important. |
| Edge inference | Low latency, local, offline, or privacy-sensitive workloads need local prediction. |

## 6. Generative AI Concepts

### Foundation Models

- Foundation models are large pre-trained models trained on broad datasets.
- They can support many tasks: text generation, summarization, Q&A, extraction, image generation, chatbots.
- They can sometimes be adapted through prompt engineering, RAG, or fine-tuning.

### Large Language Models

- LLMs generate human-like text from prompts.
- They are non-deterministic: the same prompt can produce different outputs.
- They generate tokens based on probability distributions.

### Tokens and Context Window

- Tokenization converts text into tokens.
- Context window is the number of tokens a model can consider at once.
- Larger context windows support more input but require more compute and can increase latency/cost.

### Embeddings

- Embeddings convert text, images, or audio into numerical vectors.
- Similar meaning usually means similar vectors.
- Embeddings are important for semantic search and RAG.

### Transformer Models

- Transformers process input more holistically than older sequence-by-sequence methods.
- They use attention to identify important relationships between words or tokens.
- GPT and BERT are transformer-based.

### Diffusion Models

- Used for image generation.
- Training adds noise to images; generation reverses noise into an image based on a prompt.

### Multimodal Models

- Accept and/or produce more than one type of data.
- Examples: text plus image input, audio plus text output, image generation from text.

## 7. Amazon Bedrock

### What Bedrock Is

Amazon Bedrock is a fully managed service for building generative AI applications on AWS.

Key points:

- Serverless managed access to foundation models.
- Unified APIs across supported models.
- Supports model choice, RAG, agents, guardrails, fine-tuning, evaluation, monitoring, and governance.
- Customer data is not used to train the base foundation model.
- Pay-per-use pricing is available.

### Choosing a Foundation Model

Consider:

- Model modality: text, image, multimodal, embedding, speech.
- Performance and latency.
- Cost.
- Context window.
- Customization support.
- Licensing and compliance.
- Accuracy for the target use case.

Exam reminder: smaller models are often cheaper and faster but may be less capable.

### Amazon Titan and Amazon Nova

- Amazon Titan: AWS foundation model family available through Bedrock.
- Amazon Nova: AWS foundation model family designed for speed, cost effectiveness, and enterprise use.
- Nova model types include text/multimodal reasoning, image generation, video generation, speech, and embeddings.

### Fine-Tuning

Fine-tuning adapts a copy of a foundation model using your own data.

- Training data usually lives in Amazon S3.
- Not all models support fine-tuning.
- Fine-tuning changes model weights.

Types:

- Supervised fine-tuning: uses labeled prompt/completion examples.
- Reinforcement fine-tuning: uses feedback or reward scores to improve model behavior.

### RAG: Retrieval-Augmented Generation

RAG lets a foundation model use external data instead of relying only on training data.

Use RAG when:

- You need current or proprietary information.
- You want more accurate and grounded answers.
- You do not want to retrain the model.
- You need a chatbot over company documents or product documentation.

Typical RAG flow:

1. Source data is split into chunks.
2. Embeddings are created.
3. Embeddings are stored in a vector database.
4. User question is converted into a query.
5. Relevant chunks are retrieved.
6. Prompt is augmented with retrieved context.
7. Model generates an answer.

AWS vector database options mentioned:

- Amazon OpenSearch Service.
- Amazon Aurora PostgreSQL.
- Amazon Neptune Analytics for graph-based RAG.
- Amazon S3 Vectors.

Common RAG data sources:

- Amazon S3.
- Confluence.
- Microsoft SharePoint.
- Salesforce.
- Web pages.

### Bedrock Guardrails

Guardrails control interactions between users and foundation models.

They can:

- Block undesirable topics.
- Filter harmful content.
- Redact personally identifiable information.
- Improve privacy and safety.
- Reduce hallucination risk.
- Monitor and analyze policy violations.

### Bedrock Agents

Agents perform multi-step tasks by combining model reasoning with actions.

They can:

- Coordinate tasks in order.
- Use action groups.
- Call APIs defined with OpenAPI schemas.
- Invoke Lambda functions.
- Use knowledge bases for RAG.
- Integrate with systems, databases, and third-party APIs.

### Bedrock Monitoring

- Model invocation logging can send logs to CloudWatch Logs and S3.
- Logs can include text, images, and embeddings.
- CloudWatch metrics can track events such as filtered content counts.
- CloudTrail can audit Bedrock API calls.

### Bedrock Pricing

| Pricing mode | Use case |
| --- | --- |
| On-demand | Unpredictable workloads, pay per token/image. |
| Batch | Multiple predictions with output in S3, can reduce cost. |
| Provisioned throughput | Reserved model capacity and predictable throughput. |

Cost drivers:

- Input tokens.
- Output tokens.
- Model size/provider.
- Image generation count.
- Embedding input tokens.

Not direct pricing drivers:

- Temperature.
- Top P.
- Top K.

### Model Improvement Cost Order

Cheapest to most expensive:

1. Prompt engineering.
2. RAG.
3. Instruction-based fine-tuning.
4. Domain adaptation fine-tuning.

## 8. Prompt Engineering

### Strong Prompt Components

- Instructions: what the model should do.
- Context: background information.
- Input data: actual text or data to process.
- Output indicator: desired format, length, or structure.

### Negative Prompting

Negative prompting tells the model what not to do.

Useful for:

- Avoiding unwanted content.
- Keeping output focused.
- Avoiding technical detail when writing for nontechnical users.
- Reducing irrelevant or inappropriate responses.

### Prompt Optimization Parameters

| Parameter | Effect |
| --- | --- |
| System prompt | Defines model behavior and role. |
| Temperature | Higher means more creative and less predictable. |
| Top P | Limits output to a probability mass of likely tokens. |
| Top K | Limits number of candidate tokens considered. |
| Length | Controls maximum response length. |
| Stop sequences | Tell the model when to stop generating. |

Latency is affected by:

- Model size.
- Model type.
- Input token count.
- Output token count.

Latency is not meaningfully affected by:

- Temperature.
- Top P.
- Top K.

### Prompting Techniques

| Technique | Description | Use when |
| --- | --- | --- |
| Zero-shot | Ask without examples. | Model likely knows the task. |
| One-shot | Provide one example. | Need light formatting or style guidance. |
| Few-shot | Provide several examples. | Need consistent structure or task behavior. |
| Chain of thought | Break task into reasoning steps. | Complex reasoning or multi-step tasks. |
| RAG prompting | Add retrieved external context. | Need grounded answers from documents/data. |
| Prompt templates | Standardize prompts with variables. | Reusable applications and agents. |

### Prompt Injection Protection

Prompt injection attempts to override instructions or hijack model behavior.

Mitigations:

- Add explicit instructions to ignore unrelated or malicious content.
- Keep system instructions separate from user input when possible.
- Use guardrails and content filters.
- Limit model access to sensitive tools and data.
- Validate tool actions before execution.

## 9. Amazon Q

### Amazon Q Business

Fully managed generative AI assistant for employees.

Use for:

- Company knowledge Q&A.
- Summaries.
- Content generation.
- Routine business actions.
- Internal document search and task automation.

Key points:

- Built on Amazon Bedrock, but users do not choose the underlying foundation model.
- Uses enterprise data connectors for managed RAG.
- Supports plugins for third-party systems.
- Integrates with IAM Identity Center.
- Users only receive answers from content they are allowed to access.
- Admin controls act like guardrails.

Common data sources:

- S3, RDS, Aurora, WorkDocs.
- Microsoft 365, SharePoint, Salesforce, Google Drive, Gmail, Slack.

Plugins:

- Jira, ServiceNow, Zendesk, Salesforce, custom APIs.

### Amazon Q Apps

- No-code generative AI app creation using natural language.
- Built from Amazon Q Business.
- Can use internal company data and plugins.

### Amazon Q Developer

AI assistant for developers and AWS users.

Use for:

- AWS documentation questions.
- Service selection.
- AWS account/resource questions.
- CLI suggestions.
- Bill analysis.
- Error troubleshooting.
- Code generation and completion.
- Security scans.
- Feature implementation and documentation.

IDE integrations:

- Visual Studio Code.
- Visual Studio.
- JetBrains-style workflows may also be relevant depending on current AWS support.

### Other Amazon Q Integrations

| Integration | Use case |
| --- | --- |
| Q for QuickSight | Natural language BI, summaries, questions, visuals. |
| Q for EC2 | EC2 instance type guidance for workloads. |
| Q for AWS Chatbot | Slack/Teams troubleshooting, alerts, account context. |
| Q for Glue | ETL help, code generation, troubleshooting Glue jobs. |

### PartyRock

- GenAI app-building playground powered by Amazon Bedrock.
- No coding required.
- No AWS account required.
- Good for experimenting with foundation models and app ideas.

## 10. AWS Managed AI Services

Managed AI services are pre-trained services for common use cases. Exam questions often ask which service fits a scenario.

### Service Selection Table

| Need | AWS service |
| --- | --- |
| Build GenAI applications with foundation models | Amazon Bedrock |
| Employee assistant over company data | Amazon Q Business |
| Developer assistant and AWS account help | Amazon Q Developer |
| Natural language processing on text | Amazon Comprehend |
| Translate text | Amazon Translate |
| Speech to text | Amazon Transcribe |
| Text to speech | Amazon Polly |
| Detect objects/faces/text/content in images/video | Amazon Rekognition |
| Build conversational bots | Amazon Lex |
| Personalized recommendations | Amazon Personalize |
| Extract text/forms/tables from documents | Amazon Textract |
| Enterprise document search | Amazon Kendra |
| Human review of ML predictions | Amazon Augmented AI |
| Crowdsource simple human tasks | Amazon Mechanical Turk |
| End-to-end custom ML | Amazon SageMaker |

### Amazon Comprehend

Natural Language Processing service.

Use for:

- Language detection.
- Key phrase extraction.
- Entity recognition.
- Sentiment analysis.
- Syntax and tokenization.
- Topic modeling.
- Document classification.

Custom features:

- Custom classification: classify documents into your categories.
- Custom entity recognition: extract business-specific entities such as policy numbers or escalation phrases.

### Amazon Translate

- Natural and accurate language translation.
- Useful for websites, applications, and large-scale text localization.

### Amazon Transcribe

Speech-to-text service using automatic speech recognition.

Use for:

- Customer service call transcription.
- Closed captions and subtitles.
- Searchable media archives.

Features:

- PII redaction.
- Automatic language identification.
- Custom vocabularies for domain-specific words and acronyms.
- Custom language models for domain context.
- Toxicity detection for voice-based interactions.

Exam distinction:

- Custom vocabulary helps with specific words.
- Custom language models help with broader domain context.

### Amazon Polly

Text-to-speech service.

Features:

- Lifelike speech.
- Lexicons for custom pronunciation.
- SSML for pauses, pronunciation, and speech control.
- Speech marks for word/sentence timing, useful for highlighting or lip sync.
- Multiple voice engines such as standard, neural, long-form, and generative.

### Amazon Rekognition

Computer vision for images and videos.

Use for:

- Object and scene detection.
- Text detection in images.
- Face detection and analysis.
- Face search and verification.
- Celebrity recognition.
- Content moderation.
- People counting and pathing.

Custom Labels:

- Train custom vision models with labeled images.
- Useful for brand logos, product shelf detection, or domain-specific objects.

Content moderation:

- Detect inappropriate or offensive images/videos.
- Can integrate with Amazon Augmented AI for human review.
- Custom moderation adapters improve moderation for a specific use case.

### Amazon Lex

Build voice and text chatbots.

Key concepts:

- Intent: what the user wants.
- Slots: required input parameters.
- Fulfillment: usually invokes Lambda or an integration to complete the action.

Integrations:

- Lambda.
- Amazon Connect.
- Comprehend.
- Kendra.

### Amazon Personalize

Fully managed recommendations service.

Use for:

- Product recommendations.
- Personalized ranking.
- Direct marketing.
- Media recommendations.
- Next best action.
- Similar item recommendations.
- User segmentation.

Exam reminder: Personalize recipes are for recommendation use cases.

### Amazon Textract

Document AI service.

Use for:

- Extracting printed text.
- Extracting handwriting.
- Extracting forms.
- Extracting tables.
- Processing scanned documents, PDFs, and images.

Common industries:

- Financial services.
- Healthcare.
- Public sector.

### Amazon Kendra

Enterprise search powered by ML.

Use for:

- Natural language search across documents.
- Extracting answers from PDFs, HTML, Word, PowerPoint, FAQs, and data sources.
- Promoting better results based on user feedback.
- Manual relevance tuning.

Exam distinction:

- Kendra is document search.
- Q Business is a full GenAI employee assistant over company data.

### Amazon Mechanical Turk

Crowdsourcing marketplace for simple human tasks.

Use for:

- Labeling images.
- Data collection.
- Human classification.
- Business processing tasks.

Integrates with:

- Amazon Augmented AI.
- SageMaker Ground Truth.

### Amazon Augmented AI

Human review of ML predictions in production.

Use when:

- Low-confidence predictions need review.
- Compliance requires human oversight.
- Predictions are high-risk.

Can use:

- Your employees.
- AWS-managed contractor workforce.
- Mechanical Turk.

## 11. Amazon SageMaker

### What SageMaker Is

Amazon SageMaker is an end-to-end managed ML service for building, training, tuning, deploying, monitoring, and governing ML models.

Use SageMaker when:

- You need custom ML models.
- You need full ML lifecycle control.
- You need training and inference infrastructure.
- You need ML governance and MLOps.

### SageMaker vs Managed AI Services

| Need | Choose |
| --- | --- |
| Pre-trained AI capability for common tasks | AWS managed AI service such as Textract, Comprehend, Rekognition. |
| Build and control a custom ML lifecycle | SageMaker. |
| Use foundation models with a managed GenAI API | Bedrock. |
| No-code custom ML | SageMaker Canvas. |

### SageMaker Capabilities

| Feature | Purpose |
| --- | --- |
| SageMaker Studio | Unified ML development interface. |
| Data Wrangler | Prepare, transform, visualize, and process data. |
| Feature Store | Store, discover, and reuse ML features. |
| Automatic Model Tuning | Tune hyperparameters. |
| Deployment and Inference | Real-time, serverless, async, and batch inference. |
| Clarify | Bias detection, explainability, and FM evaluation. |
| Ground Truth | Data labeling and human feedback. |
| Model Cards | Model documentation. |
| Model Dashboard | Central view of model status and issues. |
| Model Monitor | Monitor production model quality and drift. |
| Model Registry | Manage and version model artifacts. |
| Pipelines | CI/CD workflows for ML. |
| Role Manager | Define role-based access for ML personas. |
| JumpStart | Model hub and pre-built ML solutions. |
| Canvas | No-code ML interface. |
| MLflow on SageMaker | Experiment tracking and ML lifecycle management. |

### Built-in Algorithms

Know that SageMaker includes built-in algorithms. Examples mentioned include:

- XGBoost.
- DeepAR for time-series forecasting using RNN concepts.

### SageMaker Deployment Options

| Option | Use when |
| --- | --- |
| Real-time endpoint | Low latency synchronous predictions. |
| Serverless inference | Intermittent traffic, no server management, can tolerate cold starts. |
| Asynchronous inference | Larger payloads or longer processing with near real-time needs. |
| Batch transform | Bulk offline processing of large datasets. |

### SageMaker Clarify

Use for:

- Foundation model evaluation.
- Human-factor evaluation such as friendliness or humor.
- Built-in evaluation metrics.
- Model explainability.
- Bias detection in datasets and models.

Bias types:

- Sampling bias: training data does not represent the full population.
- Measurement bias: collection tools or measurements are flawed.
- Observer bias: human collecting/interpreting data influences results.
- Confirmation bias: humans favor information that confirms existing beliefs.

### SageMaker Ground Truth

Use for:

- Data labeling.
- Human feedback for model evaluation.
- RLHF workflows.
- Model review and customization.

Workforce options:

- Your employees.
- Third-party vendors.
- Mechanical Turk workers.

### SageMaker Governance

- Model Cards document intended use, risk, training details, and other model facts.
- Model Dashboard centralizes model information and flags issues.
- Model Monitor watches production quality, drift, bias, and explainability issues.
- Model Registry tracks versions, metadata, approvals, and deployment state.
- Role Manager helps define access by ML persona.

### SageMaker Network Isolation

- Network isolation mode runs SageMaker job containers without outbound internet access.
- In strict network isolation, jobs cannot access Amazon S3 unless configured through allowed paths/endpoints.

## 12. Responsible AI

### Core Responsible AI Dimensions

- Fairness: reduce discrimination and promote inclusion.
- Explainability: help humans understand model behavior.
- Privacy and security: protect personal and sensitive data.
- Transparency: be clear about AI behavior and limitations.
- Veracity and robustness: reliable under expected and unexpected conditions.
- Governance: policies and controls for AI use.
- Safety: avoid harm to people and society.
- Controllability: align systems with human intent and values.

### Responsible AI AWS Services

| Need | AWS service/control |
| --- | --- |
| Evaluate foundation models | Bedrock model evaluation, SageMaker Clarify. |
| Filter unsafe GenAI content | Bedrock Guardrails. |
| Redact PII in prompts/responses | Bedrock Guardrails, Transcribe redaction for audio. |
| Detect bias | SageMaker Clarify. |
| Fix data imbalance | SageMaker Data Wrangler and data augmentation. |
| Monitor production model quality | SageMaker Model Monitor. |
| Human review | Amazon Augmented AI, SageMaker Ground Truth. |
| Governance documentation | SageMaker Model Cards, AI Service Cards. |

### AI Service Cards

AWS AI Service Cards document:

- Intended use cases.
- Limitations.
- Responsible AI design choices.
- Deployment best practices.
- Performance optimization guidance.

### Interpretability vs Explainability

- Interpretability: humans can understand why/how the model made a decision.
- Explainability: humans can explain model behavior from inputs and outputs, even if the internal mechanics are complex.
- Highly interpretable models may have lower performance.
- Neural networks are usually less interpretable but can perform well.

High interpretability example:

- Decision trees are easy to visualize and understand but can overfit.

Explainability aid:

- Partial dependence plots show how one feature influences prediction while holding others constant.

### Human-Centered Design

Design AI systems for:

- Clear decision support.
- Reduced risk and errors.
- Accountability.
- Unbiased decision-making.
- Human and AI learning.
- Accessible user-centered workflows.

## 13. Generative AI Risks and Misuse

| Risk | Meaning | Mitigation |
| --- | --- | --- |
| Hallucination | Plausible but incorrect claims. | Use RAG, verification, user warnings, independent sources. |
| Toxicity | Offensive or inappropriate output. | Curate data, guardrails, content filters. |
| Plagiarism/cheating | AI-generated work used improperly. | Policies, detection, attribution, human review. |
| Prompt injection | User input overrides instructions. | Guardrails, strict prompt boundaries, tool validation. |
| Prompt hijacking | Model behavior redirected maliciously. | Input validation, least privilege, guardrails. |
| Prompt leaking | Hidden prompts or sensitive context exposed. | Avoid secrets in prompts, limit context, filters. |
| Data exposure | Sensitive data revealed during training/inference. | Data governance, encryption, access controls, redaction. |
| Data poisoning | Malicious data added to training data. | Data validation, trusted sources, monitoring. |
| Jailbreaking | Attempts to bypass safety controls. | Guardrails, model updates, monitoring, policy enforcement. |

## 14. Governance and Compliance

### Key Concepts

- Governance: policies, roles, oversight, and controls for AI systems.
- Compliance: meeting regulatory and industry requirements.
- Regulated workloads: workloads with audit, archival, security, reporting, or legal obligations.

Common regulated industries:

- Financial services.
- Healthcare.
- Aerospace.
- Legal and public sector.

### AI Compliance Challenges

- Complexity and opacity make systems hard to audit.
- AI systems change over time.
- Emergent capabilities can appear.
- Bias and privacy risks are unique and high impact.
- Algorithms need accountability.

### Governance Framework

Practical governance actions:

- Establish an AI governance board or committee.
- Define acceptable AI use policies.
- Define risk management processes.
- Document model purpose, training data, limitations, and owners.
- Track model versions and approvals.
- Monitor production performance and drift.
- Define incident response and escalation.

### AWS Governance Tools

| Service | Purpose |
| --- | --- |
| AWS Config | Track resource configuration and compliance. |
| AWS CloudTrail | Audit API calls and account activity. |
| AWS Artifact | Download compliance reports and agreements. |
| AWS Audit Manager | Continuously collect audit evidence and prepare reports. |
| AWS Trusted Advisor | Account recommendations across cost, security, performance, fault tolerance, limits, and operational excellence. |
| Amazon Inspector | Vulnerability scanning for EC2, ECR images, and Lambda. |
| Amazon Macie | Discover sensitive data such as PII in S3. |

## 15. AWS Security Basics for AI

### Shared Responsibility Model

AWS is responsible for security of the cloud:

- Data centers.
- Hardware.
- Managed infrastructure.
- Underlying services.

Customer is responsible for security in the cloud:

- Data management.
- Identity and access.
- Application configuration.
- Encryption choices.
- Network access.
- Prompt/data governance.

For Bedrock and SageMaker, customers still manage data, permissions, network configuration, and application-level controls.

### IAM

| IAM concept | Purpose |
| --- | --- |
| IAM user | Represents a physical user; can have console password/access keys. |
| IAM group | Collection of users only. |
| IAM policy | JSON permissions document. |
| IAM role | Temporary permissions assumed by AWS services, users, or workloads. |

Exam principle: use least privilege.

### Amazon S3

- Object storage used heavily by AI/ML workflows.
- Stores training data, batch input/output, logs, documents, and model artifacts.
- Can encrypt data with SSE-S3 or SSE-KMS.
- If Bedrock needs encrypted S3 data with SSE-KMS, its IAM role needs both S3 access and KMS decrypt permission.

### AWS KMS

- Managed service for encryption keys.
- Used for encrypting data at rest.
- KMS key policies and IAM permissions must allow the service to decrypt when needed.

### AWS Lambda

- Serverless function service.
- Useful in AI workflows for event-driven processing, Bedrock agent action groups, and automation.

### Amazon EC2

- Virtual servers.
- You choose AMI, instance type, storage, security groups, and user data.
- Less central for AIF-C01 than managed AI services, but useful for basic AWS understanding.

## 16. Network Security and Private Access

### VPC Basics

- VPC: private network in AWS, scoped to a Region.
- Subnet: partition inside a VPC, scoped to an Availability Zone.
- Public subnet: has route to the internet.
- Private subnet: not directly reachable from the internet.
- Internet Gateway: enables internet access for public subnets.
- NAT Gateway: lets private subnet resources access the internet while remaining private.

### VPC Endpoints and PrivateLink

Use VPC endpoints to access AWS services privately without using the public internet.

Exam examples:

- App in a VPC accesses Bedrock through an interface VPC endpoint powered by PrivateLink.
- SageMaker notebook accesses S3 privately through an S3 gateway endpoint.

### Private AI Workloads

For private model access:

- Put app resources in private subnets.
- Use VPC endpoints for Bedrock/SageMaker/S3 where supported.
- Use IAM roles and endpoint policies.
- Use security groups for network control.
- Use CloudTrail for audit.

## 17. Security and Compliance Services

### Amazon Macie

- Finds sensitive data such as PII in S3.
- Helps with data privacy and governance.

### AWS Config

- Records configuration changes.
- Evaluates resources against rules.
- Useful for compliance auditing.
- Regional service.

### Amazon Inspector

Scans:

- EC2 instances.
- ECR container images.
- Lambda functions.

Finds:

- Package vulnerabilities.
- Network reachability issues for EC2.
- CVE-based risks.

Integrates with:

- Security Hub.
- EventBridge.

### AWS CloudTrail

- Records API calls and account activity.
- Enabled by default.
- Logs actions from console, SDK, CLI, and AWS services.
- Can send logs to CloudWatch Logs or S3.
- If a resource was deleted, check CloudTrail first.

### AWS Artifact

- Portal for AWS compliance reports and agreements.
- Reports include ISO, PCI, SOC, and other third-party audit documents.
- Agreements include items such as BAA/HIPAA where applicable.
- Supports internal audit and compliance work.

### AWS Audit Manager

- Continuously audits AWS usage.
- Collects evidence.
- Supports frameworks such as CIS, GDPR, HIPAA, PCI DSS, and SOC 2.
- Generates assessment reports and evidence folders.

### AWS Trusted Advisor

Provides account-level recommendations across:

- Cost optimization.
- Performance.
- Security.
- Fault tolerance.
- Service limits.
- Operational excellence.

Full checks require Business or Enterprise Support.

## 18. High-Value Service Comparisons

### Bedrock vs SageMaker

| Scenario | Choose |
| --- | --- |
| Build GenAI app using managed foundation models | Bedrock |
| Need RAG, agents, guardrails for GenAI | Bedrock |
| Train/deploy custom ML model lifecycle | SageMaker |
| Need custom training jobs, pipelines, model registry | SageMaker |
| Need no-code custom ML | SageMaker Canvas |
| Need foundation model hub deployed on SageMaker | SageMaker JumpStart |

### Q Business vs Kendra

| Scenario | Choose |
| --- | --- |
| Natural language document search | Kendra |
| Employee GenAI assistant over internal data | Q Business |
| Take actions through plugins | Q Business |
| Need user access-aware answers with IAM Identity Center | Q Business |

### Comprehend vs Textract

| Scenario | Choose |
| --- | --- |
| Understand text meaning, entities, sentiment, topics | Comprehend |
| Extract text/tables/forms from scanned documents | Textract |
| Custom text classification | Comprehend |
| Read handwriting/forms in PDFs/images | Textract |

### Transcribe vs Polly vs Translate

| Scenario | Choose |
| --- | --- |
| Speech to text | Transcribe |
| Text to speech | Polly |
| Text from one language to another | Translate |

### Rekognition vs Textract

| Scenario | Choose |
| --- | --- |
| Detect objects, faces, scenes, moderation labels | Rekognition |
| Extract structured document text, forms, tables | Textract |
| Detect text in a general image | Rekognition can detect image text |
| Process invoices, IDs, forms, scanned PDFs | Textract |

### A2I vs Mechanical Turk vs Ground Truth

| Service | Main use |
| --- | --- |
| Amazon Augmented AI | Human review of ML predictions in production. |
| Mechanical Turk | Crowdsourcing simple human tasks. |
| SageMaker Ground Truth | Data labeling and human feedback for ML training/evaluation. |

## 19. Common Exam Keywords

Map these words to services:

- "Foundation models", "RAG", "agents", "guardrails": Bedrock.
- "Employee assistant", "company knowledge", "IAM Identity Center": Amazon Q Business.
- "Developer code companion", "AWS docs", "CLI suggestions": Amazon Q Developer.
- "Sentiment", "entities", "key phrases", "language detection": Comprehend.
- "Speech to text", "captions", "call transcription": Transcribe.
- "Text to lifelike speech": Polly.
- "Translate text": Translate.
- "Faces", "objects", "image moderation": Rekognition.
- "Chatbot intent and slots": Lex.
- "Recommendations", "ranking", "similar items": Personalize.
- "Forms", "tables", "handwriting", "scanned documents": Textract.
- "Enterprise search", "answers from documents": Kendra.
- "Human review loop": Augmented AI.
- "Crowd labeling": Mechanical Turk.
- "Custom ML lifecycle", "training", "tuning", "deployment": SageMaker.
- "Bias and explainability": SageMaker Clarify.
- "Production model drift": SageMaker Model Monitor.
- "Model documentation": SageMaker Model Cards.
- "Model versions and approvals": SageMaker Model Registry.
- "ML CI/CD": SageMaker Pipelines.
- "Sensitive data in S3": Macie.
- "API audit trail": CloudTrail.
- "Configuration compliance": Config.
- "Compliance reports": Artifact.
- "Audit evidence": Audit Manager.
- "Private access to AWS service": VPC endpoint / PrivateLink.

## 20. Final Cram Checklist

- Know the hierarchy: AI > ML > Deep Learning > Generative AI.
- Know supervised vs unsupervised vs reinforcement learning.
- Know classification vs regression and their metrics.
- Know overfitting causes and mitigations.
- Know tokens, context windows, embeddings, vector databases, and RAG.
- Know Bedrock features: FMs, RAG, agents, guardrails, fine-tuning, evaluation, CloudWatch, CloudTrail.
- Know prompt techniques: zero-shot, one-shot, few-shot, chain of thought, negative prompts, templates.
- Know prompt risks: injection, hijacking, leaking, jailbreaking, exposure, poisoning.
- Know Amazon Q Business vs Q Developer.
- Memorize managed AI service use cases.
- Know SageMaker lifecycle services and governance features.
- Know responsible AI dimensions and AWS services that support them.
- Know shared responsibility and least privilege.
- Know CloudTrail, Config, Macie, Inspector, Artifact, Audit Manager, Trusted Advisor.
- Know VPC endpoints and PrivateLink for private AI service access.


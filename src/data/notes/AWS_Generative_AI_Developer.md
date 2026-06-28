# AWS Certified Generative AI Developer - Professional

**Exam:** AIP-C01 | **Duration:** 180 minutes | **Questions:** 75 | **Cost:** ~$300

---

## 1. GenAI Fundamentals and Bedrock

### Foundation Models (FMs)
- Large pre-trained transformer models used for specific tasks or new applications
- Examples: GPT-n (OpenAI), Claude (Anthropic), DALL-E, LLaMa (Meta), DeepSeek, Nova

### AWS Foundation Models (Base Models) on Bedrock
| Model | Provider | Key Use Cases |
|---|---|---|
| **Jurassic-2** | AI21 Labs | Multilingual text gen (Spanish, French, German, Portuguese, Italian, Dutch) |
| **Claude** | Anthropic | Conversations, Q&A, workflow automation |
| **Stable Diffusion** | stability.ai | Image, art, logo, design generation |
| **Llama** | Meta | General LLM |
| **Amazon Titan** | Amazon | Text summarization, generation, Q&A, embeddings, personalization, search |
| **Amazon Nova Pro** | Amazon | LLM portfolio of models |
| **Amazon Nova Reels** | Amazon | Video |

### Amazon Bedrock Overview
- **Serverless** API for generative AI Foundation Models
- Invoke chat, text, or image models
- Supports pre-built, fine-tuned, or custom-imported models
- Third-party models billed through AWS via their own pricing
- Supports RAG and LLM agents
- Integrates with SageMaker Canvas
- **Must use IAM user (not root)** with Bedrock permissions:
  - `AmazonBedrockFullAccess`
  - `AmazonBedrockReadOnly`

### Bedrock API Endpoints
- **`bedrock`**: Manage, deploy, train models
- **`bedrock-runtime`**: Perform inference (prompts, embeddings)
  - `Converse`, `ConverseStream`, `InvokeModel`, `InvokeModelWithResponseStream`
- **`bedrock-agent`**: Manage agents and knowledge bases
- **`bedrock-agent-runtime`**: Perform inference against agents/KBs
  - `InvokeAgent`, `Retrieve`, `RetrieveAndGenerate`

### Converse API (Key Details)
- Unified API for models that support messages
- Specify prompt in `messages` field (or an ARN to prompt management)
- Specify `modelId`
- Optional: model-specific fields, guardrails, config (max tokens, temperature), prompt variables, tools
- Converse API supports `outputConfig` for structured output

### Fine-Tuning ("Custom Models")
- **Fine-tuning** = Additional training using your own labeled data
- Titan, Cohere, and Meta models can be fine-tuned in Bedrock
- **Text models**: Provide labeled prompt/completion pairs in JSONL: `{"prompt": "...", "completion": "..."}`
- **Image models**: Provide pairs of image S3 paths to descriptions
- Upload training data to **S3**
- Use **VPC and PrivateLink** for sensitive training data
- Your resulting "custom model" is used like any other model

### Continued Pre-Training
- Like fine-tuning but with **unlabeled data**
- Just feed it text to familiarize the model with your domain
- Format: `{"input": "Your text here"}`
- Includes extra data into the model itself (reduces need for it in prompts)

### Low-Rank Adaptation (LoRA)
- Does NOT update the entire model — only "low-rank matrices" (typically applied to attention weights)
- At inference, fine-tuned weights get added into the base model
- **Base model remains unchanged**
- Very efficient for storage, training, and inference
- Different from an "adapter layer" added to the top of a model

### Retrieval-Augmented Generation (RAG)
- "Open-book exam" for LLMs — query external database, inject results into prompt
- **Pros**: Faster/cheaper than fine-tuning, prevents hallucinations, easy "AI search"
- **Cons**: Sensitive to prompt templates, non-deterministic, still can hallucinate

### Embeddings
- A large vector (point in multidimensional space) associated with data
- Items similar to each other are **close** in embedding space
- **Sparse** = large vectors, mostly empty (like one-hot encoding)
- **Dense** = smaller vectors with more semantic information (what you generally use)
- **Cosine similarity** = common measure of how close two vectors are
- Amazon Titan default = **1024+ dimensions**

### Vector Databases (for RAG)
- Stores data alongside computed embedding vectors
- Search = compute embedding for query → find top-K nearest neighbors (K-NN)
- **Existing DBs with vector search**: OpenSearch/Elasticsearch, SQL, Neptune, Redis, MongoDB, Cassandra
- **Purpose-built (commercial)**: Pinecone, Weaviate
- **Purpose-built (open source)**: Chroma, Marqo, Vespa, Qdrant, LanceDB, Milvus

### RAG in Bedrock: Knowledge Bases
- Upload documents to S3 (or connect SharePoint, Confluence, Salesforce, web crawler)
- Must use an embedding model (Cohere or Amazon Titan)
- You can control **vector dimension** and **chunking**
- Vector store options: serverless OpenSearch (default), MemoryDB, Aurora, MongoDB Atlas, Pinecone, Redis Enterprise Cloud

### Chunking Strategies
| Type | Description |
|---|---|
| **Fixed Size** | You specify tokens per chunk and overlap percentage |
| **Default** | 300 tokens per chunk, honoring sentence boundaries |
| **No Chunking** | Every document is a chunk |
| **Hierarchical** | Nested parent/child chunks; child for precision, parent for context |
| **Semantic** | Uses FM to break chunks by semantic content; costs money |

### Optimizing Embeddings
- Smaller vector sizes = less cost (fewer dimensions per chunk)
- Tradeoff: smaller dimensions can hurt retrieval performance
- Balance dimensionality with domain fit

### Optimizing Retrieval with Metadata
- Vector DB can store metadata alongside vectors
- Use `metadata.json` to specify what's content vs. metadata
- Filter/rank by metadata for better retrieval (document ID, category, access control, topic, section)

### Pre-Retrieval Optimization
- **Chunking/Granularity**: Individual sentences vs. fixed block size vs. summaries
- **Query Rewriting**: Normalize query to corpus style, break multi-part questions

### Measuring Your RAG System
- Bedrock RAG evaluation metrics: Correctness, Completeness, Helpfulness, Logical coherence, Faithfulness, Citation precision, Harmfulness, Stereotyping, Refusal
- **LLM as a judge**: Use another model (Llama, Claude, Nova, Mistral) to score responses
- Provide prompt dataset in JSON with prompts and reference responses
- **Answer Relevance** (query → response), **Context Relevance** (query → context), **Groundedness** (context → response)

### Multimodal Models and Pipelines
- "Multimodal" = mixing text, images, audio, video, documents
- Claude, Nova, Titan support multimodal
- **Titan Multimodal Embeddings G1**: Pass structured JSON with base64-encoded image
- Multimodal embedding models convert different media types to compatible embedding vectors

### Amazon Bedrock Guardrails
- Content filtering for prompts and responses (text FMs only)
- **Word filtering**, **Topic filtering**, **Profanities**, **PII removal/masking**
- **Contextual Grounding Check**: Measures "grounding" (response vs. context) and relevance
- Can incorporate into agents and knowledge bases
- **Automated Reasoning Checks**: Enforce complex policies (mortgage, medical). Upload policy as PDF, use `CreateAutomatedReasoningPolicy` API

### Token-Level Redaction
- Custom pre/post-processing handlers around inference endpoints
- Identify sensitive info via pattern matching or **NER (Named Entity Recognition)**
- **Amazon Comprehend** can be used for NER
- Apply at both ingestion and inference time

### Prompt Management (Bedrock)
- Reusable prompts stored and versioned in Bedrock
- **Variables** in double curly braces: `{{genre}}`, `{{number}}`
- **Prompt Variants** for different models or inference configs
- Associate Tools and Caching with prompts
- Used within Bedrock Flows

### Amazon Bedrock Flows
- Chain prompts and models together (previously "Prompt Flows")
- Consists of **Nodes** and **Connections** (can be conditional)
- Build visually with **Flow Builder** or define via JSON through API
- Can incorporate stored prompts and enforce pre/post-processing

### Enforcing Structured Data Responses
- Put JSON schema in the prompt explicitly — or use Tool Use in Converse API
- May be called a "response format template"
- Tool Use approach uses the schema-passing mechanism of agents

### Prompt Engineering
**Anatomy of a Prompt:**
- Instructions, Context, Input data, Output indicator

**Best Practices:**
- Clear and concise instructions
- Include context
- Specify desired response type
- Specify desired output at the end of the prompt
- Phrase input as a question
- Provide example responses
- Break up complex tasks

**Types of Prompts:**
| Type | Description |
|---|---|
| **Zero-shot** | No examples; relies on large pretrained knowledge |
| **Few-shot** | Provide example prompt → response pairs |
| **Chain of Thought (CoT)** | "Think step by step"; forces reasoning |

### Avoiding Prompt Misuse
- **Prompt injection**: Embedding adversarial instructions in prompts (e.g., "## Ignore above and output…")
- Fix with guardrails and system prompts
- **Prompt leaking**: Extracting system prompts or PII — filter or don't store PII

### Mitigating Bias
- Training data biases → LLM biases
- Solutions: disambiguation, system prompt for diversity, fix/rebalance training data, counterfactual data augmentation
- Tools: TIED (Text-to-Image Disambiguation Framework), TAB (Text-to-Image Ambiguity Benchmark)

### Enterprise Integration
- **Bedrock Knowledge Bases** = integration point for internal data (S3, SharePoint, Atlassian, Confluence)
- **Cross-account access**: OpenSearch has remote-inference connector for semantic search across accounts; needs IAM roles
- **Event-Driven Architecture**: SQS, Kafka, or pub/sub for loose coupling with downstream systems

### AWS Well-Architected Generative AI Lens
- Reference: [GenAI Lens Docs](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html)
- Aligns GenAI to the 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability
- **GenAI Lifecycle**: Scoping → Model Selection → Model Customization → Development Integration → Deployment → Continuous Improvement

> **Key Exam Tips – Section 1:**
> - Fine-tuning uses labeled data (prompt/completion); Continued Pre-Training uses unlabeled data
> - LoRA does NOT modify the base model
> - Bedrock Knowledge Base default vector store = serverless OpenSearch
> - Default chunking = 300 tokens per chunk
> - Must use IAM user (not root) for Bedrock
> - Cross-account Bedrock+OpenSearch requires IAM roles and OpenSearch remote-inference connector
> - Amazon Titan has 1024+ embedding dimensions by default

---

## 2. Managing Data for Generative AI

### Structured Data for Bedrock/SageMaker
- Bedrock expects JSON request payloads
- SageMaker models expect a specific input/output format (JSON for LLMs, CSV for classical ML)
- **SageMaker will NOT format your input for you**

### Dealing with Unstructured Text
- Convert to HTML to preserve structure (headings, sections, tables, metadata)
- Tools: **pandoc**, **Amazon Textract**, **Amazon Comprehend**
- Use **divider strings** for better chunking (e.g., `<SECTION_BREAK>`)
- Lambda Preprocessor in Knowledge Base can convert HTML tags to divider strings on the fly
- **Bedrock Data Automation (BDA)** is the newer/easier way to extract structure

### Bedrock Data Automation (BDA)
- Extracts structured data from documents, images, videos, audio (multimodal)
- **Use cases**: Preparing data for vector stores/KBs, Intelligent Document Processing (IDP), Video analysis (scene summaries, explicit content, text in video, ads)
- **Standard Output**: Guesses format (JSON for docs, transcript for audio)
- **Custom Output**: Specify exact fields with a **Blueprint**
  - Standard blueprints (e.g., US Driver License) or define your own
  - Store in a **Project**
  - Kick off via `InvokeDataAutomationAsync` with your project
- **BDA Document Processing**: PDF, TIFF, JPEG, PNG, DOCX → JSON or JSON+files (CSV, text, markdown)
  - Granularity: page-level, element-level (default), word-level
- **BDA Image Processing**: JPEG, PNG → image summary, IAB taxonomy, logos, text, content moderation
- **BDA Video Processing**: MP4, MOV, AVI, MKV, WEBM → full/chapter summaries, IAB taxonomy, transcript, text in video, logos, content moderation
- **BDA Audio Processing**: AMR, FLAC, M4A, MP3, Ogg, WAV → summary, full transcript (with speaker/channel labels), topics, content moderation
- **Blueprint Capabilities**: Classification, Extraction, Normalization (key + value), Transformation, Validation

### SageMaker Data Wrangler
- Visual interface in **SageMaker Studio** to prepare ML data
- Import → Visualize → Transform (300+ transformations) → Quick Model → Export
- Supports: image transformation, balance data (SMOTE), impute missing data, handle outliers, PCA
- **Sources**: S3, Lake Formation, Athena, Redshift, SageMaker Feature Store, JDBC (Databricks, SaaS)
- Troubleshooting: Check IAM roles (add `AmazonSageMakerFullAccess`); EC2 instance limit may need quota increase

### AWS Glue
- **Serverless** ETL and data catalog
- Glue Crawler scans S3/RDS/Redshift → populates **Glue Data Catalog** (stores only table definition, original data stays in S3)
- Enables unstructured data to be treated as structured (via Redshift Spectrum, Athena, EMR, QuickSight)
- **Glue Studio**: Visual ETL workflow with DAG editor; sources = S3, Kinesis, Kafka, JDBC
- **Glue Data Quality**: Rules via DQDL (Data Quality Definition Language); integrates into Glue jobs; results to CloudWatch

### S3 Partitioning for Glue
- Think about primary query dimension: if querying by time → `yyyy/mm/dd/device`; if by device → `device/yyyy/mm/dd`

### Amazon CloudWatch (for Data)
- Metrics with timestamps; up to **30 dimensions per metric**
- **Custom Metrics**: For RAM, etc.
- **CloudWatch Metric Streams**: Near-real-time stream to Kinesis Data Firehose or 3rd party (Datadog, Splunk, etc.)

### Amazon Transcribe
- **ASR (Automatic Speech Recognition)** converts speech to text
- Features: PII redaction, automatic language identification for multi-lingual audio
- **Improving Accuracy**:
  - **Custom Vocabularies**: Add specific words/phrases (brand names, acronyms, pronunciation hints)
  - **Custom Language Models**: Train on domain-specific text for context
  - Use **both** for highest accuracy
- **Toxicity Detection**: ML-powered, uses tone/pitch AND text cues; categories = sexual harassment, hate speech, threat, abuse, profanity, insult, graphic

### Amazon Comprehend
- **NLP service** — Fully managed, serverless
- Capabilities: language detection, key phrase extraction, entities (people, places, brands, events), sentiment, tokenization, topic modeling
- **Custom Classification**: Categorize documents into your defined classes; real-time (single doc) or async (batch)
- **Named Entity Recognition (NER)**: Extracts predefined entities (people, places, orgs, dates)
- **Custom Entity Recognition**: Train to find business-specific terms (policy numbers, escalation phrases)
- **Using with Lambda**: Redact PII, extract entities, detect language, classify data before hitting Bedrock
- **Comprehend Medical**: HIPAA-certified; extracts health data (prescriptions, diagnoses, PHI); separate `DetectPHI` API; integrates with VPC Endpoints/PrivateLink

### Amazon OpenSearch Service
- Fork of Elasticsearch/Kibana; search engine + analytics + visualization
- **Applications**: Full-text search, log analytics, app monitoring, security analytics, clickstream analytics
- **Concepts**: Documents → Types → Indices (with inverted indices); Shards (replicated)
- **Storage Tiers**: Hot (fastest, EBS/instance store) → UltraWarm (S3+caching, good for immutable data, must have dedicated master) → Cold (S3, cheapest, for forensic analysis, needs master + UltraWarm enabled)
- **Index State Management (ISM)**: Automates policies (delete old indices, move hot→warm→cold); runs every 30-48 minutes
- **3 dedicated master nodes** to avoid "split brain"
- Minimum storage: `Source Data * (1 + Number of Replicas) * 1.45`
- **Anti-patterns**: OLTP (use RDS/DynamoDB), ad-hoc querying (use Athena)

### Amazon OpenSearch Serverless
- On-demand autoscaling; works against "collections" (search or time series type)
- Always encrypted with KMS; lower limit = **2 OCUs for indexing, 2 for search**
- **"serverless" does NOT mean "scales to zero"** — you'll be billed even if idle!

### OpenSearch as a Vector Store
- Primary implementation for Bedrock Knowledge Bases (per exam)
- **Semantic search** = vector search; **Hybrid search** = vector + keyword
- Vector engines: **FAISS**, **NMSLib**, **Apache Lucene**
  - **Exact K-NN**: Slow
  - **ANN**: Hierarchical Navigable Small World (HNSW) — fast, high-quality, uses lots of RAM
  - **IVF**: Better for huge datasets
- Tuning params: `M` (edges per node, higher = denser graph, more memory), `ef_construction` (graph accuracy, slower indexing), `ef_search` (recall vs. search performance)
- **Shard sizes**: Larger shards (30-50 GB) for semantic search; smaller (10-30 GB) for hybrid
- **Neural plugin**: Integrates embedding model into OpenSearch ingest pipeline; allows text queries that auto-generate embeddings

### Amazon S3 Vectors (New)
- Up to **90% cheaper** than OpenSearch
- Create S3 vector bucket → vector index (specify dimensions + distance metric)
- Store with `put_vectors` (include metadata); Query with `query_vectors`
- **Strongly consistent** — newly added data immediately available
- Performance: **100ms-1s** (not for high-performance); AWS recommends hybrid approach with OpenSearch for performance-critical queries ("tiered search strategy")
- Max indices per bucket: **10,000** (2B vectors per index)
- Best practices: Insert/delete in batches of **500 per API call**; up to **2500 vectors/second**; use retry mechanism (429 error = rate limit); use multiple indexes for isolation
- Integrated with Bedrock Knowledge Bases and SageMaker Unified Studio

### Amazon RDS / Aurora
- **RDS**: Managed relational DB; supports Postgres, MySQL, MariaDB, Oracle, SQL Server, IBM DB2, Aurora
- **Aurora**: AWS-proprietary; 5x MySQL perf, 3x Postgres perf; storage auto-grows in 10GB increments up to **256 TB**; up to **15 read replicas** (<10ms replica lag); 6 copies across 3 AZs; failover <30 seconds
- **Aurora as Vector Store**: Uses **pgvector extension** (creates vector column type); supports cosine, L2, inner product; great if you need complex SQL filtering alongside vector search; ideal for small/medium RAG with mostly structured data

### Amazon DynamoDB
- Fully managed, highly available NoSQL; replication across multiple AZs
- Scales to millions req/s, trillions of rows, 100s of TB; **max item size = 400KB**
- **Partition Key** (HASH) or **Partition Key + Sort Key** (HASH + RANGE)
- **Read/Write modes**: Provisioned (plan ahead, auto-scale, exponential backoff on `ProvisionedThroughputExceededException`) or On-Demand (2.5x more expensive)
- **WCU**: 1 WCU = 1 write/sec for items up to 1 KB
- **RCU**: 1 RCU = 1 strongly consistent read/sec for items up to 4 KB (or 2 eventually consistent reads/sec)
- **DAX** (DynamoDB Accelerator): Microsecond latency; default **5-min TTL**; up to **10 nodes**; multi-AZ (3 nodes minimum for production); solves "Hot Key" problem
- **TTL**: Unix Epoch timestamp; doesn't consume WCUs; expired items deleted within few days; enter DynamoDB Streams
- **With GenAI**: NOT a vector store, but can store/retrieve chat histories ("long-term memory") and serve real-time data to models

### S3 Storage Classes
| Class | Availability | Min Storage | Retrieval |
|---|---|---|---|
| Standard | 99.99% | None | Instant |
| Standard-IA | 99.9% | 30 days | Instant |
| One Zone-IA | 99.5% | 30 days | Instant |
| Glacier Instant Retrieval | 99.9% | 90 days | Milliseconds |
| Glacier Flexible Retrieval | 99.99% | 90 days | 1-5 min (Expedited), 3-5h (Standard), 5-12h (Bulk) |
| Glacier Deep Archive | 99.99% | 180 days | 12h (Standard), 48h (Bulk) |
| Intelligent-Tiering | 99.9% | None | Varies |

- **S3 Durability**: 99.999999999% (11 9's) for all storage classes
- **S3 Lifecycle Rules**: Transition actions (move between classes) or Expiration actions (delete)
- **Replication**: CRR (Cross-Region), SRR (Same-Region); must enable versioning; only new objects after enabling (use S3 Batch Replication for existing)

### S3 Encryption
- **SSE-S3** (default): AWS-managed keys, AES-256, header `x-amz-server-side-encryption: AES256`
- **SSE-KMS**: Customer-controlled KMS keys, better auditing via CloudTrail, header `x-amz-server-side-encryption: aws:kms`; may hit KMS quota (5500, 10000, 30000 req/s)
- **SSE-C**: Customer-provided keys; HTTPS mandatory; key in HTTP headers
- **Client-Side Encryption**: Client encrypts before sending; AWS never sees plaintext

> **Key Exam Tips – Section 2:**
> - BDA = new/easier way to extract structure from multimodal content for vector stores
> - Glue Data Catalog stores only table definitions (original data stays in S3)
> - Transcribe: use both Custom Vocabularies AND Custom Language Models for highest accuracy
> - OpenSearch Serverless minimum = 2 OCUs indexing + 2 OCUs search (always billed even if idle!)
> - S3 Vectors = cheap but slow (100ms-1s); use hybrid with OpenSearch for performance-critical
> - Aurora pgvector = best when you need vector + relational queries together
> - DynamoDB = great for chat history/agent long-term memory; NOT a vector store
> - S3 Standard durability = 11 nines (99.999999999%)

---

## 3. Agentic AI

### LLM Agents
- Giving **tools** to your LLM — the LLM decides which tools to use
- Agent has: memory (chat history + external data stores), planning module, and tools
- Tools = functions (often Lambda functions in Bedrock)
- Bedrock uses **Action Groups** to define tools; each has a prompt telling FM when to use it, and parameter definitions

### Bedrock Action Groups
- Define name, description, type, required status of each parameter
- Description is important — the LLM uses it to extract info from user prompts
- Can use OpenAI-style schemas or Bedrock UI table
- Agents can also have Knowledge Bases ("Agentic RAG")
- Optional: **Code Interpreter** lets the agent write its own code for questions or charts

### Deploying Bedrock Agents
- Create an **alias** → creates a deployed snapshot
- **On-Demand Throughput (ODT)**: Runs at account-level quotas
- **Provisioned Throughput (PT)**: Purchase increased rate and token count
- Use `InvokeAgent` request with alias ID and Agents for Amazon Bedrock Runtime Endpoint

### Multi-Agent Systems
- Orchestrator breaks down tasks and delegates to worker LLMs
- **Manager (Orchestrator–workers)**: Synthesizer combines results
- **Routing**: Router LLM chooses one specialized agent
- **Parallelization**: Sectioning (independent subtasks in parallel), Voting (multiple models vote on best result)
- **Prompt Chaining**: Discrete known steps; gates keep things on track; e.g., write → translate
- **Evaluator–Optimizer**: One LLM generates; another evaluates; feedback loop until good enough

### When to Use Multi-Agent?
- Too many tools (one agent can't choose appropriately)
- Complex logic (prompts get too complicated with conditional statements)

### Agent Memory
- **Short-term**: Chat history within session; in-memory or distributed cache (ElastiCache, MemoryDB)
- **Long-term**: Extracted insights, session summaries, preferences, facts; stored in DynamoDB, SQLite, RDS, Aurora, AgentCore Memory, Mem0

### Strands Agents
- Python SDK from Amazon (open source), like OpenAI Agents SDK, CrewAI, LangGraph
- Works with Bedrock, Lambda, Step Functions, AND non-AWS providers (OpenAI, etc.)
- Multimodal support; MCP support
- Built-in tools: AWS Services/boto3, Bedrock KBs, Mem0, Python code runner, HTTP, shell commands, file manipulation, agent swarms, Amazon Polly (speech)
- Strands Agent Loop: Input/context → LLM/reasoning → Tool selection → Tool execution → Response

### AWS Agent Squad
- Open-source framework for multi-agent workflows
- Intelligent intent classification and routing
- Python and TypeScript
- Shares contexts across agents; many pre-built agents and classifiers
- Integrates with Bedrock Agents; can extend Bedrock Flows
- **Agent Squad = routing focus; Strands = tool use in single agent loop**

### Amazon Bedrock AgentCore
- Handles deployment and operation of AI agents **at scale**
- **Serverless**; works with ANY agent framework (OpenAI Agent SDK, LangGraph, CrewAI, etc.)
- "Starter toolkit" manages deployment to ECR
- Includes: Agent Runtime, Memory, Gateways, Identity, Policy, Observability, Evaluations
- **AgentCore Agent Runtime**: Serverless endpoints; deploy to ECR; observability via CloudWatch "GenAI Observability"
- **AgentCore Memory**: Short-term (Session objects + Events) + Long-term ("Memory Records" for structured info, strategies for preferences/semantic facts/session summaries)
- **AgentCore Built-in Tools**: Browser Tool (control browser), Code Interpreter (runs Python/JS/TS in isolated container)
- **Importing Bedrock Agents**: `agentcore import-agent` → generates Strands or LangChain/LangGraph code
- **AgentCore Gateway**: Converts APIs, Lambda, or services into **MCP tools**; targets OpenAPI/Smithy/Lambda; manages OAuth; semantic tool selection
- **AgentCore Identity**: Central repository for agent identities; OAuth 2.0; built-in Google, GitHub, Slack, Salesforce, Atlassian support
- **Policy in AgentCore**: Uses **Cedar language**; deny by default; evaluate full context; Enforce mode or Log-only mode
- **AgentCore Evaluations**: Assess task performance, edge cases, consistency; integrates with Strands, LangGraph, OpenTelemetry, OpenInference; cross-region inference

### Model Context Protocol (MCP)
- Standardized interface for agent-tool interactions ("USB-C port for AI Applications" – Anthropic)
- Data layer: JSON-RPC 2.0; transport: stdio or HTTP streaming
- Servers expose tools, resources, and prompts
- Popular MCP servers: GitHub, Atlassian, PostgreSQL, Slack, Google Maps
- **Deploying MCP Server**: Lambda (stateless/lightweight), ECS/Fargate (complex tools), API Gateway (expose MCP endpoints); also deployable via AgentCore

### OpenAPI and GenAI
- Used to define interfaces between FMs and tools
- May be used with Bedrock Action Groups (upload OpenAPI schema to S3 or edit in console)

### Humans in the Loop
- AI prepares drafts; humans refine (human augmentation pattern)
- Escalation criteria: route complex/uncertain cases to experts based on confidence scores
- Collect feedback via **API Gateway → Lambda → DynamoDB** pipeline
- Use to measure which model/variant is preferred

### Amazon Q Business
- Fully managed Gen-AI assistant for employees; built on Bedrock (can't choose underlying FM)
- **Data Connectors** (fully managed RAG): 40+ enterprise sources (S3, RDS, Aurora, WorkDocs, MS 365, Salesforce, GDrive, Gmail, Slack, SharePoint)
- **Plugins**: Jira, ServiceNow, Zendesk, Salesforce; Custom Plugins via APIs
- **IAM Identity Center** integration: users get responses only from documents they have access to
- **Admin Controls** (Guardrails): Block topics, restrict to internal info, global/topic-level controls
- **Amazon Q Apps**: Create GenAI apps without coding using natural language

> **Key Exam Tips – Section 3:**
> - Bedrock Action Groups = tool definitions; prompts tell FM when to use them
> - Strands = tool use focus; Agent Squad = routing focus
> - AgentCore is framework-agnostic (works with OpenAI, LangGraph, etc.)
> - AgentCore Gateway converts tools into MCP endpoints
> - MCP = "USB-C for AI" — standardized agent-tool interface using JSON-RPC 2.0
> - Amazon Q Business cannot choose the underlying FM (it's Bedrock under the hood)
> - Cross-region inference is auto-enabled in AgentCore Evaluations

---

## 4. Operational Efficiency and Optimization

### Token Efficiency
- **Bedrock CountTokens API**: Returns token count for a request without running it; costs nothing
- CloudWatch tracks `InputTokenCount` and `outputTokenCount`
- Monitor: `TTFT` (Time to First Token), model latency, invocation count, throttles

### Token Efficiency Techniques
- **Context Window Optimization/Pruning**: Limit RAG chunks, filter by metadata, summarize old chat history
- **Response Size Controls**: Use `maxTokens`, bake length in prompt, use JSON output format
- **Prompt Compression**: Use small model to summarize large chats/docs before sending to large model; use KBs instead of complete documents in prompt

### Cost-Effective Model Selection
- Do you really need the largest model? Smaller models handle pre-processing well
- **Dynamic Routing (Intelligent Prompt Routing)**: Route to different models based on query complexity
  - A feature in Bedrock
  - Implement with conditional Flow, Lambda, Agent Squad, or Strands
- Measure performance vs. cost with Bedrock Evaluations and token counting

### Maximizing Resource Utilization
- **Batching**: Batch embeddings for vector stores; Bedrock Batch Inference (submit prompts in S3, get responses in S3)
- **Capacity Planning**: Use AWS Service Quotas Bedrock tool; request quota increase or use provisioned throughput
- **Tensor Parallelism**: Shards LLM weights across GPUs for better memory utilization
- **Provisioned Throughput**: Provision by Tokens or Model Units (MUs); required for customized models
- **Auto-scaling**: Serverless solutions (Lambda, Bedrock, OpenSearch Serverless, AgentCore)

### Intelligent Caching Systems
- **Semantic Caching**: Cache embeddings of prompts + responses in in-memory vector store (ElastiCache for Valkey, MemoryDB)
  - For new prompts, create embedding, find nearest neighbors, if similarity > threshold, return cached response
  - Tune similarity threshold carefully
- **Prompt Caching** (built into Bedrock):
  - Cache a static prompt prefix (system prompts, few-shot examples)
  - Place dynamic content at end; cache checkpoint separates the two
  - No need to re-tokenize prefix; discounted token price for cached content (writes more expensive)
  - Monitor via CloudWatch
- **Edge Caching** (CloudFront): Cache deterministic GenAI responses at edge; use request hash fingerprint in GET request; set aggressive TTL if data changes often

### Building Responsive AI Systems
- Use parallel requests for complex workflows (Step Functions, multi-agent)
- **Latency-optimized inference** for FMs: Set `performanceConfig={'latency': 'optimized'}` in API calls
  - Optimizes TTFT (Time to First Token), OTPS (Output Tokens per Second), E2E Latency
- Use Bedrock Intelligent Prompt Routing
- Keep prompts concise; put important stuff first
- Context pruning; limit response sizes; break up complex tasks

### Optimizing Retrieval Performance
- Optimize indices (hybrid search improves relevancy)
- Custom hybrid scoring functions
- **Query pre-processing**: Normalize query to corpus style, break multi-part questions, filter irrelevant content, reduce ambiguity, keyword extraction for hybrid search

### Model Parameters for Specific Use Cases
- **Temperature**: Randomness (0=deterministic, 1=creative)
- **Top_p**: Nucleus sampling — probability threshold for token candidates (use temperature OR top_p)
- **Top_k**: How many token options to sample from
- A/B testing via Bedrock Evaluations or **CloudWatch Evidently**

### Optimizing FM System Performance
- API call profiling to find caching/batching/RAG opportunities
- Use structured I/O (JSON, XML)
- Chain of Thought patterns for complex reasoning
- Feedback loops for user satisfaction
- **SageMaker AI**: Deploy models up to 500GB; adjust health check/download timeout quotas; 3rd party parallelization (Triton, FasterTransformer, DeepSpeed)
- **Instance types**: Large models → `ml.p4d.24xlarge` (GPU); Small models (NER) → `ml.c5.9xlarge` (CPU)
- **UltraServers** (Trn2, P6e-GB200): Low-latency, high-bandwidth accelerator interconnects

### Exponential Backoff (Specific Exam Guidance)
- Start at **100ms**; backoff factor **2**; max retry count **3-5**; jitter **±100ms**

### Connection Pooling (Specific Exam Guidance)
- **10-20 connections per instance**; connection TTL **60-300 seconds**

### Bedrock Cross-Region Inference
- Distributes workloads across regions for peak usage or quotas
- **SCP (Service Control Policy)** can block regions — specify allowed regions or leave unspecified
- **Inference Profiles**:
  - Geographic: selects optimal region within your geography; data residency compliance; standard pricing
  - Global: selects any commercial AWS region; maximized throughput; **10% cost savings**
- Pricing based on where you called it from
- Data encrypted in transit, logged in CloudTrail
- Does NOT work with provisioned throughput

### Re-ranker Models in Bedrock
- Improves relevance of retrieved RAG results
- Calculates relevance of chunks to query, orders accordingly
- `Rerank` operation in API
- Currently Amazon or Cohere models (limited regions)

> **Key Exam Tips – Section 4:**
> - Exponential backoff: start 100ms, factor 2, max 3-5 retries, jitter ±100ms
> - Connection pooling: 10-20 connections, TTL 60-300s
> - Prompt caching discounts cached token price (but writes cost more)
> - Global cross-region inference = 10% cost savings
> - Bedrock latency-optimized = `performanceConfig={'latency': 'optimized'}`
> - Semantic caching uses in-memory vector stores (ElastiCache/MemoryDB), not just DynamoDB

---

## 5. Managing Models with SageMaker AI

### SageMaker ML Workflow
Data prep → Train/Evaluate Model → Deploy/Evaluate in Production

### SageMaker Training & Deployment
- Training data from S3; training code image from ECR; produces model artifacts in S3
- Inference code image from ECR deployed as endpoint

### SageMaker Data Prep
- Data usually from S3; ideal format = RecordIO/Protobuf
- Can ingest from Athena, EMR, Redshift, Amazon Keyspaces
- Apache Spark integration; scikit-learn, numpy, pandas available in notebooks

### SageMaker Processing
- Processing jobs: Copy data from S3 → spin up container (built-in or custom) → output to S3

### Deploying Trained Models
- Save to S3; two deployment options:
  1. **Persistent endpoint**: Individual on-demand predictions
  2. **SageMaker Batch Transform**: Predictions for entire dataset
- Options: Inference Pipelines, **SageMaker Neo** (edge), Elastic Inference, Automatic Scaling, **Shadow Testing**

### Deployment Safeguards
- **Deployment Guardrails**: For async or real-time inference endpoints; controls traffic shifting
  - **All at once**: Shift everything, monitor, terminate blue fleet
  - **Canary**: Shift small portion, monitor
  - **Linear**: Shift in linearly spaced steps
- **Auto-rollbacks** available
- **Shadow Tests**: Compare shadow variant to production; you decide when to promote

### SageMaker More Features
- **SageMaker JumpStart**: One-click models; 150+ open-source models in NLP, object detection, image classification
- **SageMaker Data Wrangler**: Import/transform/analyze/export data in Studio
- **SageMaker Feature Store**: Find, discover, share features; Online (low latency) or Offline (batch inference) modes; organized into Feature Groups
- **SageMaker Edge Manager**: Software agent for edge devices; model optimized with Neo; collects data for monitoring/labeling/retraining
- **Asynchronous Inference Endpoints**: For long-running tasks

### Optimizing FM Deployments
- **Multi-model endpoints** and **multi-container endpoints**
- Train/tune in SageMaker AI, deploy through **Bedrock Custom Model Import** → serverless inference
- **SageMaker AI Inference Components**: Each model gets its own scaling policy
- **Available model servers**: TorchServe, **DJL Serving** (Deep Java Library — Amazon-made, more likely on exam), Deep Learning Containers, Triton Inference Server
- **Model compression**: Quantization, Pruning, **Knowledge Distillation** (smaller model trained from larger model)

### SageMaker Ground Truth
- Manages humans who label data for training
- Creates its own model as images are labeled — only sends ambiguous data to humans
- Can **reduce labeling cost by 70%**
- Labelers: **Mechanical Turk**, internal team, professional labeling companies
- **Ground Truth Plus**: Turnkey AWS-managed labeling solution; track via Project Portal; output to S3
- Alternative labels: Rekognition (image classification), Comprehend (text topic/sentiment classification)

### SageMaker Model Monitor
- Get alerts on quality deviations on deployed models (via CloudWatch)
- **Visualize data drift** (e.g., loan model drifts due to drifting input features)
- **Monitoring Types**: Data quality drift, model quality drift, bias drift, feature attribution drift (NDCG score)
- Integrates with Tensorboard, QuickSight, Tableau, SageMaker Studio

### SageMaker Clarify
- Detects potential **bias** (imbalances across demographic groups)
- **Pre-training Bias Metrics**: Class Imbalance (CI), DPL, KL, JS, Lp-norm, TVD, KS, CDD
- Explains model behavior — shows which features contribute most to predictions
- Integrated with Model Monitor to alert on new bias via CloudWatch

### SageMaker Model Registry
- Catalog models, manage versions
- Associate metadata; manage approval status; automate deployment with CI/CD; share models

### SageMaker ML Lineage Tracking
- Creates and stores ML workflow (MLOps)
- **Entities**: Trial component, Trial, Experiment, Context, Action, Artifact, Association
- **Association types**: ContributedTo, AssociatedWith, DerivedFrom, Produced, SameAs
- Use `LineageQuery` Python API for queries
- Cross-account via `AddAssociation` API + IAM roles

### SageMaker Neo
- "Train once, run anywhere" — edge devices (ARM, Intel, Nvidia processors)
- Compiles for specific devices; supports TF, MXNet, PyTorch, ONNX, XGBoost, DarkNet, Keras
- **Neo + IoT Greengrass**: Deploy to actual edge devices; inference at edge with local data; uses Lambda inference applications

### SageMaker Unified Studio
- Single interface for data, analytics, AI, ML; includes Bedrock, Q, QuickSight
- Administrators manage users/groups and access; domain connects assets, users, projects
- Connects from Visual Studio Code

### SageMaker Pipelines
- DAG for ML workflows
- Define visually or via JSON
- Integrated with SageMaker Unified Studio and SageMaker AI

### MLFlow (with SageMaker)
- Open-source ML/GenAI platform; observability, evaluations, tracking, tracing, AI gateway, model management
- Integration points: SageMaker Studio, Model Registry, SageMaker AI Inference, IAM, CloudTrail, EventBridge

> **Key Exam Tips – Section 5:**
> - Ground Truth reduces labeling cost by up to 70%
> - DJL Serving is Amazon-made → more likely on exam than Triton or TorchServe
> - Model Monitor sends alerts via CloudWatch; integrate with Clarify for bias drift
> - Shadow Tests = compare shadow variant to production before promoting
> - Train in SageMaker AI + Bedrock Custom Model Import = serverless inference

---

## 6. More Tools for Building AI Applications

### AWS Lambda
- Serverless code execution; continuous scaling
- **Supported languages**: Node.js, Python, Java, C#, Go, PowerShell, Ruby
- Lambda + Kinesis: Up to **10,000 records per batch**; batches split at **6 MB** payload limit; Lambda processes shard data **synchronously**
- **GenAI uses**: Connect agents with tools, on-demand FM invocation without provisioning, receive webhooks, custom aggregation from multiple models

### AWS API Gateway
- No infrastructure; WebSocket Protocol support; API versioning; security (auth/authz); throttling; Swagger/OpenAPI import
- **Integration types**: Lambda, HTTP, AWS Service
- **Endpoint Types**:
  - **Edge-Optimized** (default): Routed through CloudFront edge; API Gateway in one region
  - **Regional**: For same-region clients
  - **Private**: VPC-only via interface VPC endpoint
- **Security**: IAM Roles, Cognito, Custom Authorizer; HTTPS via ACM; Edge-Optimized needs cert in `us-east-1`
- **GenAI uses**: Front for feedback, front for models, response filtering, retry strategies, token limit management, routing logic

### AWS AppConfig
- Dynamic configuration changes without code deployments
- Feature flags, tuning, allow/block listing; validate with JSON Schema or Lambda
- **GenAI use**: Dynamic FM selection with no code changes; A/B testing; rollbacks (also SageMaker, Bedrock Evaluations, CloudWatch Evidently can do A/B tests)

### AWS Step Functions
- Visual workflow; advanced error handling; max execution time **1 year**
- **State Types**: Task, Choice, Wait, Parallel, Map (per-item parallel processing), Pass, Succeed, Fail
- **256KB limit** between data passed between steps (use DynamoDB or S3 for larger)
- **Circuit Breaker Pattern**: Detect and route around failing services (Step Functions + Lambda + DynamoDB)
- **GenAI uses**: ReAct patterns (Reasoning and Acting), chain of thought, dynamic routing to specialized FMs, model review/approval workflows; integrated with Bedrock (`InvokeModel`, `CreateModelCustomizationJob`)

### CI/CD for GenAI
- **CodePipeline**: Orchestrate CICD — Source → Build → Test → Deploy → Invoke
- **CodeBuild**: Fully managed CI; uses `buildspec.yml`; charges per compute minute; Docker for reproducibility
- **CodeDeploy**: Automates deployments to EC2, on-premises, Lambda, ECS; Blue/Green, Canary, Linear, AllAtOnce strategies; Lambda: `LambdaLinear10PercentEvery3Minutes`, `LambdaCanary10Percent5Minutes`, etc.

### AWS AppSync GraphQL
- Serverless; connects apps to data/events via GraphQL and Pub/Sub APIs
- **GenAI use**: Integrate Lambda with AppSync resolvers for real-time FM inference; VTL (Apache Velocity Template Language) maps GraphQL requests to model inputs

### AWS Outposts
- "Server racks" bringing AWS infrastructure on-premises; AWS manages them
- **GenAI uses**: Data compliance across jurisdictions, on-premise data integration, need sufficient compute/storage for FM inference, local caching to minimize data movement

### AWS Wavelength
- Infrastructure in telecom datacenters at edge of 5G networks
- Ultra-low latency applications through 5G; no additional charges
- **GenAI uses**: Edge FM deployments, mobile FM apps, distribute traffic between Wavelength Zones and parent regions

### Amazon SQS
- **Standard Queue**: Unlimited throughput, max **1,024 KB per message**, default **4-day** retention (max 14 days), at-least-once delivery, best-effort ordering
- Consumers receive up to **10 messages** at a time; delete after processing
- Security: in-flight HTTPS, at-rest KMS, client-side encryption, IAM + SQS Access Policies

### Amazon SNS
- Pub/Sub; event producer → SNS topic → multiple subscribers
- Up to **12,500,000 subscriptions per topic**; **100,000 topics limit**
- Subscribers: SQS, Lambda, Kinesis Firehose, Email, SMS, HTTP(S) endpoints

### AWS Amplify
- Tools for full stack web/mobile app development
- Features: Auth, Storage, API (REST, GraphQL), CI/CD, PubSub, Analytics, AI/ML Predictions, Monitoring
- Connect to GitHub, CodeCommit, Bitbucket, GitLab

### Amazon EventBridge
- Event-driven architecture; schedule (cron) or event pattern triggers
- Sources: EC2, CodeBuild, S3, CloudTrail, etc.
- Destinations: Lambda, Batch, ECS Task, SQS, SNS, Kinesis, Step Functions, etc.
- **Schema Registry**: Analyze events and infer schema; generate code
- **Resource-based Policy**: Allow/deny events from other accounts; aggregate events across organization

> **Key Exam Tips – Section 6:**
> - Step Functions has 256KB inter-step limit; store large data in DynamoDB/S3
> - Lambda + Kinesis: max batch 10,000 records; 6MB payload limit; synchronous processing
> - API Gateway Edge-Optimized cert must be in us-east-1
> - AppConfig = dynamic FM selection without code changes
> - CodeDeploy Lambda canary pattern: `LambdaCanary10Percent5Minutes`

---

## 7. Governance and QA

### Bedrock Agent Tracing
- Every Agent response includes a trace showing reasoning process
- Trace types: PreProcessing, Orchestration, PostProcessing, CustomOrchestration, RoutingClassifier, Failure, Guardrail

### Foundation Model Evaluation Criteria
- **Human Evaluation**: UX, contextual relevancy, creativity, handling complex problems
- **Benchmark Datasets**: SME-created prompt/answer sets; measure accuracy, speed, scalability, context retrieval
- **LLM as Judge**: Trusted model evaluates responses; risk if judge and evaluated model share problems

### Evaluation Metrics
| Metric | Description |
|---|---|
| **ROUGE-N** | Overlap of n-grams (ROUGE-1: unigrams, ROUGE-2: bigrams); for summarization/translation; **recall**-based |
| **ROUGE-L** | Longest common subsequence; evaluates coherence and narrative order |
| **BLEU** | Machine translation; measures **precision** of n-grams; brevity penalty; limited fluency/grammar assessment |
| **BERTscore** | Uses embedding vectors to compare **semantic similarity**; less sensitive to synonyms/paraphrasing |

### Bedrock Model Evaluations
- **Automatic model evaluations**: Built-in task types (text generation, summarization, Q&A, classification)
- **Human-based**: Humans compare two models given prompt dataset; set up work team in Cognito, SageMaker Ground Truth, or Amazon Augmented AI
- **LLM as a judge**: Evaluator + generator model; provide prompt dataset with many metrics
- **RAG evaluation jobs**:
  - *Retrieve only*: Measures retrieval relevance and coverage
  - *Retrieve and generate*: Correctness, completeness, helpfulness, logical coherence
  - Provide prompt dataset in S3 in **JSON line format**

### Deployment Validation
- **Synthetic user workflows**: Simulate end-to-end usage before and after deployments; use CloudWatch synthetic monitoring (canaries), Step Functions, EventBridge, Lambda; store in S3/Athena, analyze in QuickSight
- **AI-specific output validation**: Measure hallucination rate, semantic drift, faithfulness, compliance
- **Response consistency**: Test that variability is within accepted range for a test prompt dataset

### Responsible AI
- **Core Dimensions**: Fairness, Explainability, Privacy/Security, Safety, Controllability, Veracity/Robustness, Governance, Transparency
- **AWS Tools**:
  - Amazon Bedrock: Model evaluation tools
  - SageMaker Clarify: Bias detection, model evaluation, explainability
  - SageMaker Model Monitor: Alerts for inaccurate responses
  - Amazon Augmented AI: Humans in the loop
  - SageMaker ML Governance (Role Manager, Model Card, Model Dashboard)

### Amazon CloudWatch
- Log groups (application name), Log streams (instances/containers); configurable expiration (**never to 10 years**)
- **Sources**: SDK, CloudWatch Logs Agent, Elastic Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway, CloudTrail, Route53
- **CloudWatch Logs Insights**: Query engine; purpose-built query language; not real-time
- **S3 Export**: Up to 12 hours to become available; API = `CreateExportTask`; use Logs Subscriptions for real-time
- **CloudWatch Alarms**: Alarm States = OK, INSUFFICIENT_DATA, ALARM; trigger SNS, EC2 actions, Auto Scaling
- **Composite Alarms**: AND/OR conditions on multiple alarms to reduce alarm noise
- **GenAI monitoring**: Prompt regression testing, KPIs (latency, error rates), hallucination rates, anomaly detection, cost anomaly detection

### AWS CloudTrail
- Governance, compliance, audit; **enabled by default**
- Captures Console, SDK, CLI, AWS service events
- **Management Events** (logged by default): Configuring security, routing, logging
- **Data Events** (not logged by default, high volume): S3 object-level activity, Lambda invocations
- **CloudTrail Insights**: Detect unusual activity; anomalies appear in console, sent to S3, EventBridge event generated
- Events stored for **90 days** (use S3 + Athena for longer retention)
- **GenAI use**: Track all Bedrock API calls; audit which prompt resources were used, when, and by whom

### AWS X-Ray
- Distributed tracing for production debugging
- **Compatibility**: Lambda, Elastic Beanstalk, ECS, ELB, API Gateway, EC2
- **Tracing**: End-to-end following of a request through all components; segments + sub-segments + annotations
- Sample request (% or rate per minute)
- **Setup**: Import X-Ray SDK in code; install X-Ray daemon (or enable AWS Integration); needs IAM rights
- X-Ray Daemon sends batches **every 1 second** to AWS X-Ray
- **Troubleshooting on Lambda**: Enable Lambda X-Ray Active Tracing; add `AWSX-RayWriteOnlyAccess` policy
- **GenAI use**: Trace FM calls, understand bottlenecks in multi-service GenAI pipelines

### AWS Lake Formation
- "Makes it easy to set up a secure data lake in days"
- Built on top of **Glue**; no cost for Lake Formation itself (underlying services charged)
- Features: Loading data, monitoring flows, partitions, encryption, ETL jobs, access control, auditing
- **Governed Tables**: ACID transactions across multiple tables; supports Kinesis streaming data; works with Athena
- **Data Permissions**: IAM, SAML, external AWS accounts; policy tags on databases/tables/columns
- **Data Filters**: Column, row, or cell-level security (all columns + row filter = row-level; all rows + specific columns = column-level; specific both = cell-level); use `CreateDataCellsFilter` API
- **Cross-account**: Use AWS Resource Access Manager; recipient must be data lake administrator

> **Key Exam Tips – Section 7:**
> - ROUGE = recall-based; BLEU = precision-based
> - BERTscore uses semantic embeddings (less sensitive to synonyms)
> - CloudTrail stores events for 90 days; use S3+Athena for longer retention
> - CloudTrail is enabled by default; data events are NOT logged by default
> - CloudWatch Logs S3 export takes up to 12 hours (use Subscriptions for real-time)
> - Lake Formation data filters: row/column/cell-level security via CreateDataCellsFilter

---

## 8. Security, Identity, and Compliance

### Principle of Least Privilege
- Grant only permissions required for the task
- Use IAM Access Analyzer to generate least-privilege policies based on access activity

### Data Masking and Anonymization
- **Masking**: Obfuscates data (last 4 digits visible); supported in Glue DataBrew and Redshift
- **Anonymization techniques**: Replace with random, shuffle, encrypt (deterministic or probabilistic), hashing
- **Key Salting**: Append random "salt" before hashing; prevents rainbow table attacks; each user should have a unique salt; rotate salts periodically

### IAM
- **Users and Groups**: Root not recommended; users can belong to multiple groups
- **Policies**: JSON documents with Version, Id, Statement (Sid, Effect, Principal, Action, Resource, Condition)
- **IAM Roles**: Assign permissions to AWS services (EC2 Instance Roles, Lambda Function Roles, CloudFormation Roles)
- **MFA options**: Virtual MFA (Google Authenticator, Authy), U2F Security Key (YubiKey), Hardware Key Fob (Gemalto, SurePassID for GovCloud)
- **IAM Identity Center** (SSO): One login for all AWS accounts, business apps, SAML 2.0 apps, EC2 Windows; supports Active Directory, OneLogin, Okta; Fine-grained permissions via Permission Sets; ABAC via user attributes

### AWS Control Tower
- Set up and govern secure multi-account AWS environment
- Uses AWS Organizations
- **Guardrails**: Preventive (SCPs) or Detective (AWS Config)

### AWS KMS
- Managed encryption keys; integrated with IAM; audited via CloudTrail
- **Symmetric**: AES-256; used by most AWS services; never exported unencrypted
- **Asymmetric**: RSA/ECC; public key downloadable; use when user can't call KMS API
- **Key Types**:
  - AWS Owned Keys (free): SSE-S3, SSE-SQS, SSE-DDB
  - AWS Managed Key (free): `aws/service-name` (e.g., `aws/rds`)
  - Customer Managed: **$1/month**; automatic annual rotation
  - Customer Managed Imported: **$1/month**; only manual rotation via alias
  - API calls: **$0.03 per 10,000 calls**
- **KMS quota**: 5,500/10,000/30,000 req/s depending on region (relevant for SSE-KMS on S3)

### Amazon Macie
- Fully managed data security using ML and pattern matching
- Discovers and protects **PII in S3 buckets**
- Sends notifications via **Amazon EventBridge**

### AWS Secrets Manager
- Store secrets; force rotation every X days; auto-generation via Lambda; encrypted with KMS
- Primarily for **RDS integration** (MySQL, PostgreSQL, Aurora)
- **Multi-Region Secrets**: Replicate across regions; can promote replica to standalone

### Amazon Cognito
- **User Pools**: Sign in for app users; integrate with API Gateway and ALB; simple login, MFA, federated identities (Facebook, Google, SAML)
- **Identity Pools** (Federated Identity): Provide temporary AWS credentials to users; integrate with User Pools; IAM policies customizable per user_id; default IAM roles for authenticated/guest users
- **Row-Level Security**: Can restrict DynamoDB row access per Cognito user

### AWS WAF (Web Application Firewall)
- Layer 7 protection against common web exploits
- Deploy on: ALB, API Gateway, CloudFront, AppSync GraphQL API, Cognito User Pool
- **Web ACL Rules**: IP Set (up to 10,000 IPs), HTTP header/body/URI filtering, SQL injection/XSS protection, size constraints, geo-match, rate-based rules (DDoS)
- Web ACLs Regional except for CloudFront

### VPC (Quick Reference)
- **VPC** = Virtual Private Cloud (regional); **Subnets** = partition inside VPC (AZ-bound)
- **Internet Gateway (IGW)**: VPC-level internet access for public subnets
- **NAT Gateway**: Private subnets access internet while remaining private
- **NACL**: Subnet-level; stateless; ALLOW and DENY rules; IP addresses only
- **Security Groups**: Instance/ENI-level; stateful; ALLOW only; IP + security groups
- **VPC Peering**: Connect two VPCs; no overlapping CIDR; not transitive
- **VPC Endpoints**: Gateway (S3, DynamoDB) or Interface (most services); private connection without internet
- **Site-to-Site VPN**: On-premises to AWS; encrypted; goes over public internet
- **Direct Connect**: Physical connection on-premises to AWS; private, secure, fast; minimum 1 month to establish

### AWS PrivateLink
- Most secure/scalable way to expose service to 1000s of VPCs
- Requires Network Load Balancer (service VPC) and ENI (customer VPC)
- No VPC peering, IGW, NAT, route tables needed

> **Key Exam Tips – Section 8:**
> - KMS Customer Managed keys = $1/month; API calls = $0.03/10,000
> - Cognito User Pools = app users; Identity Pools = temporary AWS credentials
> - WAF Web ACL = Regional (except CloudFront)
> - Secrets Manager primarily for RDS (not general purpose secrets)
> - Macie = PII detection in S3 via ML, sends alerts via EventBridge

---

## 9. Other Services You Should Know

### Analytics

#### Amazon Athena
- Interactive SQL query service for **S3** data; no need to load data; **Presto** under the hood; **serverless**
- Formats: CSV, TSV, JSON, ORC, Parquet, Avro, Snappy, Zlib, LZO, Gzip
- Use cases: Ad-hoc web log queries, CloudTrail/CloudFront/VPC/ELB logs in S3, QuickSight integration

#### Amazon EMR
- Managed Hadoop on EC2; includes Spark, HBase, Presto, Flink, Hive
- **Node types**: Master (leader, tracks status), Core (hosts HDFS + runs tasks, risk if scaled), Task (runs tasks only, no data, safe for spot instances)
- **Transient clusters**: Shut down when done (saves money); **Long-running clusters**: Manually terminated

#### Amazon QuickSight
- Serverless BI; dashboards, paginated reports, ad-hoc analysis, anomaly alerts
- **SPICE**: Super-fast in-memory engine; 10GB per user; 30-minute import timeout
- Security: VPC connectivity, row-level security, column-level security (Enterprise edition only)
- Data sources: Redshift, Aurora/RDS, Athena, OpenSearch, IoT Analytics, EC2 DBs, S3/Excel/CSV files
- **Anti-pattern**: ETL (use Glue)

#### Amazon Kinesis Data Streams
- Collect and store streaming data in real-time
- Retention: up to **365 days**; data up to **1MB**; data ordering within same Partition ID
- **Provisioned mode**: 1 MB/s in (1000 records/s) per shard, 2 MB/s out; manual scaling
- **On-demand mode**: Scales automatically; default 4 MB/s in (4000 records/s)

#### Amazon MSK (Managed Streaming for Apache Kafka)
- Alternative to Kinesis; fully managed Kafka; deploy in VPC, multi-AZ (up to 3 for HA)
- Default **1MB** message size (configurable to 10MB+); Kafka Topics with Partitions (can only add partitions)
- KMS at-rest encryption; PLAINTEXT or TLS in-flight

### Compute / Containers

#### Amazon EC2
- Elastic Compute Cloud; virtual machines; manual server management

#### Amazon ECS (Elastic Container Service)
- EC2 Launch Type: You provision/maintain EC2 instances; ECS Agent required on each instance
- Fargate Launch Type: **Serverless**; just create task definitions; AWS runs ECS tasks
- **IAM**: EC2 Instance Profile (ECS agent API calls, CloudWatch logs, ECR pull, Secrets Manager); ECS Task Role (per-task permissions)
- Load Balancers: ALB (most use cases), NLB (high throughput or PrivateLink), avoid Classic LB

#### Amazon EKS
- Managed Kubernetes; alternative to ECS; cloud-agnostic
- Node types: Managed, Self-Managed, Fargate
- Deploy one EKS cluster per region for multi-region

#### AWS App Runner
- Fully managed; deploy web apps and APIs from source code or container image; auto-scaling, HA, load balancer, encryption

### Customer Engagement

#### Amazon Lex & Connect
- **Lex**: ASR + NLU for chatbots (same tech as Alexa); integrates with Lambda, Connect, Comprehend, Kendra
- **Connect**: Cloud-based virtual contact center; 80% cheaper than traditional; integrates with CRM

### Database

#### Amazon DocumentDB
- AWS-implementation of MongoDB; stores, queries, indexes JSON data; replication across 3 AZs; auto-scales to millions req/s

#### Amazon ElastiCache
- Managed Redis or Memcached; in-memory; reduces DB load; microsecond latency
- **Redis**: Multi-AZ, read replicas, data persistence, backup/restore, sorted sets
- **Memcached**: Sharding only; non-persistent; multi-threaded
- **ElastiCache for Valkey** (fork of Redis): Supports vector search; billions of embedding vectors; microsecond latency; recall >99%

#### Amazon MemoryDB
- Supports Valkey and Redis OSS vector search; all in-memory; Multi-AZ
- **Vector algorithms**: Flat (brute force linear) or (approximate for faster execution)

#### Amazon Neptune
- Managed graph database; up to 15 read replicas; billions of relations at millisecond latency
- Use cases: knowledge graphs, fraud detection, recommendation engines, social networking
- **Neptune Analytics**: `vectors.topKByEmbedding` for vector search with graph traversals

### Developer Tools

#### AWS CDK
- Define cloud infrastructure in TypeScript/Python/Java/.NET
- Code "compiled" into CloudFormation templates; great for Lambda and ECS/EKS

#### AWS CloudFormation
- Declarative infrastructure-as-code; JSON/YAML; creates resources in correct order
- Cost tagging per stack; automated diagram generation

#### AWS CodeArtifact
- Artifact management for Maven, Gradle, npm, yarn, twine, pip, NuGet

#### AWS CLI / SDK
- CLI: Command-line access to AWS APIs
- SDK: Language-specific libraries (JavaScript, Python, PHP, .NET, Ruby, Java, Go, Node.js, C++, iOS, Android, IoT)

### Machine Learning (Other)

#### Amazon Augmented AI (A2I)
- Human oversight of ML predictions in production (your employees, 500k+ AWS contractors, or Mechanical Turk)
- High-confidence predictions returned immediately; low-confidence sent for human review
- Reviewed data can be added back to training dataset

#### Amazon Kendra
- Managed document search powered by ML
- Extracts answers from text, PDF, HTML, PowerPoint, Word, FAQs
- Natural language search; learns from user interactions (Incremental Learning)
- **Best for enterprise document search with permissions/ACLs**

#### Amazon Rekognition
- Object, people, text, scenes detection in images/videos
- Facial analysis, face search, celebrity recognition, content moderation
- **Custom Labels**: Label images and train custom model; can use few hundred images
- **Content Moderation API**: `DetectModerationLabels`; integrates with A2I for human review; Custom Moderation Adaptors

#### Amazon Textract
- Extracts text, handwriting, data from scanned documents using AI/ML
- Extract from forms and tables; supports PDFs, images
- Use cases: financial services, healthcare, public sector

### Management and Governance

#### AWS Auto Scaling
- Covers EC2 ASG, EC2 Spot Fleet, ECS, DynamoDB, Aurora Read Replicas
- Dynamic scaling (target tracking) or Predictive scaling (forecast based)

#### AWS Cost Anomaly Detection
- ML to detect unusual spend; learns historic patterns; no threshold needed
- Alerts via SNS

#### AWS Cost Explorer
- Visualize/manage costs; custom reports; granularity to resource level; forecast up to 18 months

#### Amazon Managed Grafana
- Managed Grafana; IAM Identity Center/SAML for auth; integrates with CloudWatch, OpenSearch, Timestream, Athena, Redshift, X-Ray, and everything Grafana supports

#### AWS Systems Manager (SSM)
- Manage EC2 and on-premises at scale; SSM Agent required on instances
- **Session Manager**: Secure shell without SSH; no port 22 needed
- **Parameter Store**: Secure storage for configs and secrets; version tracking; encrypted with KMS

### Migration and Data Transfer

#### AWS DataSync
- Move large amounts of data to/from AWS; preserves permissions and metadata
- On-premises → AWS (NFS, SMB, HDFS, needs agent); AWS → AWS (no agent)
- Sync targets: S3 (any class including Glacier), EFS, FSx
- One agent task = **10 Gbps** bandwidth

#### AWS Transfer Family
- Managed FTP/FTPS/SFTP transfers into/out of S3 or EFS
- Multi-AZ, scalable, pay per provisioned endpoint + data transferred
- Integrates with Active Directory, LDAP, Okta, Cognito

### Networking and Content Delivery

#### Amazon CloudFront
- CDN; content cached at edge; hundreds of Points of Presence globally
- DDoS protection via Shield; WAF integration
- Origins: S3 bucket (OAC), VPC Origin (ALB/NLB/EC2), Custom HTTP
- **CloudFront vs S3 CRR**: CloudFront = cached (TTL maybe 1 day), great for static content everywhere; S3 CRR = near-real-time replication, great for dynamic content at low-latency in few regions

#### AWS Global Accelerator
- Uses AWS internal network; 2 Anycast IPs
- Intelligent routing to lowest latency; fast regional failover (<1 min)
- Health checks; DDoS protection via Shield
- **vs CloudFront**: CloudFront = HTTP content served at edge; Global Accelerator = TCP/UDP proxying, good for non-HTTP (gaming, IoT, VoIP)

#### Amazon Route 53
- Highly available, scalable, authoritative DNS + Domain Registrar
- **Only AWS service with 100% availability SLA**
- Record types: A (IPv4), AAAA (IPv6), CNAME (hostname), NS (name servers)
- Hosted Zones: Public or Private; **$0.50 per month per hosted zone**

#### Elastic Load Balancing
- **ALB**: HTTP/HTTPS/gRPC (Layer 7); HTTP routing; static DNS
- **NLB**: TCP/UDP (Layer 4); millions req/s; static Elastic IP
- **Gateway Load Balancer**: GENEVE protocol (Layer 3); routes to 3rd party virtual appliances

### Storage

#### Amazon EBS
- Network-attached block storage for EC2; locked to AZ; provisioned capacity
- Cannot SSH; snapshots to move across AZs

#### Amazon EFS (Elastic File System)
- Managed NFS; mount on many EC2 instances across multi-AZ; pay-per-use
- Performance modes: **General Purpose** (default, low latency) or **Max I/O** (high throughput, parallel)
- Throughput modes: Bursting, Provisioned, Elastic (scales automatically)
- Storage tiers: Standard → Infrequent Access → Archive; lifecycle policies move files

> **Key Exam Tips – Section 9:**
> - ElastiCache for Valkey supports vector search (microsecond latency, recall >99%)
> - Neptune Analytics: `vectors.topKByEmbedding` for graph + vector
> - Kendra = enterprise document search with permission enforcement
> - Athena = serverless SQL on S3 (Presto under the hood)
> - Route 53 = only AWS service with 100% availability SLA
> - CloudFront vs S3 CRR: CloudFront for global static, S3 CRR for regional dynamic
> - EFS = multi-AZ, multi-EC2; EBS = single EC2 (same AZ)

---

## 10. Architectural Decisions

### Choosing a Vector Store

| Option | Best For | Cost | Ops Burden |
|---|---|---|---|
| **OpenSearch Managed** | Custom RAG, fine-grained tuning | $$–$$$ (always-on) | Medium |
| **OpenSearch Serverless** | Unpredictable/spiky traffic, low-ops | $–$$ (usage-based) | Low |
| **Amazon Kendra** | Enterprise docs with permissions/ACLs | $$$ | Very low |
| **Aurora + pgvector** | RAG + relational data, SQL joins + vector | $$ | Medium |
| **Neptune Analytics** | RAG + graph relationships (fraud, lineage) | $$$  | Medium |
| **Amazon S3 Vectors** | Massive corpus, cost-optimized, infrequent queries | $ (very cost-driven) | Very low |

**Decision shortcuts:**
- SharePoint/Confluence/document ACLs → **Kendra**
- Graph relationships → **Neptune Analytics**
- Already on Postgres + SQL + vector → **Aurora + pgvector**
- Huge corpus + cost pressure → **S3 Vectors**
- Full search platform + tuning → **OpenSearch managed**
- Unpredictable traffic + minimize ops → **OpenSearch Serverless**

### OpenSearch vs. OpenSearch Serverless
| Dimension | OpenSearch | OpenSearch Serverless |
|---|---|---|
| Billing | Always-on nodes | Per-request + storage |
| Tuning | Full control | Limited |
| Latency | Predictable | Variable |
| Scaling | Manual/Auto | Automatic |
| Exam hint | "Need fine-grained control" | "Unpredictable traffic" |

### When to Use Step Functions?
- Auditable state transitions
- Retry & failure isolation
- Explicit approval steps
- Human approval workflows

### Example Architectures

**Internal Legal Q&A Chatbot:**
- Cognito authenticates users → API Gateway → Lambda → Bedrock (with Kendra retrieval)
- **Kendra** appropriate for: enterprise document search, SharePoint integration, document-level ACL
- No WAF/CloudFront (internal use)

**Customer-Facing Chatbot:**
- WAF → CloudFront → API Gateway → Lambda → Bedrock (with OpenSearch Serverless)
- Lambda can also do other DB queries
- Add Cognito for personal/private info; add Guardrails in Bedrock
- Ingestion: S3 → EventBridge → Lambda → Bedrock (embeddings) → OpenSearch

---

## 11. Exam Preparation Tips

### About the Exam
- **Duration**: 180 minutes
- **Questions**: 75
- **Question Types**:
  - Multiple choice (1 correct from 4)
  - Multiple response (2+ correct from 5+; no partial credit)
  - **Ordering**: 3-5 responses in correct order (NEW; no partial credit)
  - **Matching**: Match responses to 3-7 prompts (NEW; no partial credit)
  - Case study type has been dropped
- **Cost**: ~$300

### Strategies
- Pace: **2–2.5 minutes per question**; flag and return if taking longer
- Use process of elimination
- Fully understand: what you're optimizing for, requirements, the system as a whole
- Don't rush; keep calm; you don't need 100%

### Preparation Resources
- AWS SkillBuilder: "Standard Exam Prep Plan" + "Official Practice Question Set" (20 questions)
- **AWS Well-Architected Generative AI Lens** (exam specifically references this)
- Amazon's Exam Guide
- Consider taking **AWS Certified AI Practitioner** first
- Take practice exams repeatedly

### Key Numbers to Memorize
| Item | Value |
|---|---|
| DynamoDB max item size | 400 KB |
| DynamoDB DAX TTL default | 5 minutes |
| DynamoDB On-Demand vs Provisioned cost | 2.5x more expensive |
| SQS message size | 1,024 KB |
| SQS default retention | 4 days (max 14) |
| SNS subscriptions per topic | 12,500,000 |
| SNS topics limit | 100,000 |
| Lambda Kinesis max batch | 10,000 records |
| Lambda payload limit | 6 MB |
| Step Functions inter-step limit | 256 KB |
| CloudTrail event retention | 90 days |
| OpenSearch Serverless min OCUs | 2 indexing + 2 search |
| S3 Vectors max per API call | 500 vectors |
| S3 Vectors throughput | 2,500 vectors/second |
| S3 Vectors max indices per bucket | 10,000 (2B vectors per index) |
| Bedrock default chunk size | 300 tokens |
| Cross-region inference savings | 10% (global profile) |
| Aurora storage auto-grows by | 10 GB increments, up to 256 TB |
| Aurora replicas | Up to 15 |
| Aurora failover | < 30 seconds |
| Ground Truth labeling cost reduction | Up to 70% |
| Exponential backoff start | 100ms, factor 2, max 3-5 retries |
| Connection pool size | 10-20 connections, TTL 60-300s |
| Route 53 availability SLA | 100% |
| Route 53 hosted zone cost | $0.50/month |
| KMS Customer Managed Key cost | $1/month |
| KMS API call cost | $0.03/10,000 calls |

---

*Good luck on the exam! The most important thing is to understand the AWS ecosystem holistically — how services integrate, when to use each one, and what the tradeoffs are.*

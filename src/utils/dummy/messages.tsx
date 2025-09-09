import { SynklunaLLMMessage } from "../types";

export const dummyMessages: SynklunaLLMMessage[] = [
  {
    id: "0",
    role: "assistant",
    text: "Hello! How can I help you today?",
    isLoading: false,
  },
  {
    id: "1",
    role: "user",
    text: "Hey there, can you help me with my JavaScript code?",
  },
  {
    id: "2",
    role: "assistant",
    text: "Of course! What seems to be the issue?",
    isLoading: false,
  },
  {
    id: "3",
    role: "user",
    text: "I'm trying to loop through an array of numbers and find the sum, but it's not working as expected.",
  },
  {
    id: "4",
    role: "assistant",
    text: "Could you share your code so I can take a look?",
    isLoading: false,
  },
  {
    id: "5",
    role: "user",
    text: "Sure: `let sum = 0; for (let i in arr) { sum += arr[i]; }` but I'm getting NaN.",
  },
  {
    id: "6",
    role: "assistant",
    text: "It might be because `arr` isn't defined or has non-numeric values. Can you log it out?",
    isLoading: false,
  },
  { id: "7", role: "user", text: "The array is `[1, 2, '3', 4]`." },
  {
    id: "8",
    role: "assistant",
    text: "Ah, the string `'3'` is causing an implicit type issue. You can parse it: `sum += Number(arr[i]);`.",
    isLoading: false,
  },
  {
    id: "9",
    role: "user",
    text: "Makes sense. Now I get 10 instead of NaN. Thanks!",
  },
  {
    id: "10",
    role: "assistant",
    text: "Great! Anything else you need help with?",
    isLoading: false,
  },
  {
    id: "11",
    role: "user",
    text: "Yes, I'm also learning about async/await. Can you give me a quick example?",
  },
  {
    id: "12",
    role: "assistant",
    text: "Sure! Example: `async function getData() { const res = await fetch('/api'); const data = await res.json(); console.log(data); }`",
    isLoading: false,
  },
  {
    id: "13",
    role: "user",
    text: "So `await` pauses execution until the promise resolves?",
  },
  {
    id: "14",
    role: "assistant",
    text: "Exactly. It lets you write asynchronous code that looks synchronous.",
    isLoading: false,
  },
  {
    id: "15",
    role: "user",
    text: "Cool. Can I use it outside of a function?",
  },
  {
    id: "16",
    role: "assistant",
    text: "In modern JavaScript (ES2022+), you can use top-level await in modules, but not in older environments.",
    isLoading: false,
  },
  {
    id: "17",
    role: "user",
    text: "Got it. Oh, and I also need a quick intro to array methods like map, filter, reduce.",
  },
  {
    id: "18",
    role: "assistant",
    text: "`map` transforms each element, `filter` keeps elements based on a condition, `reduce` accumulates values into one result.",
    isLoading: false,
  },
  {
    id: "19",
    role: "user",
    text: "Can you give me an example using all three?",
  },
  {
    id: "20",
    role: "assistant",
    text: "`[1,2,3,4].map(n=>n*2).filter(n=>n>4).reduce((a,b)=>a+b,0)` → maps to `[2,4,6,8]`, filters to `[6,8]`, reduces to `14`.",
    isLoading: false,
  },
  { id: "21", role: "user", text: "Perfect, I understand now." },
  {
    id: "22",
    role: "assistant",
    text: "Glad to hear that! Do you want me to prepare a practice set for you?",
    isLoading: false,
  },
  { id: "23", role: "user", text: "Yes, please. That would be great." },
  {
    id: "24",
    role: "assistant",
    text: "Alright, I'll make 10 exercises for array manipulation, async/await, and object handling.",
    isLoading: false,
  },
  { id: "25", role: "user", text: "Thanks a ton!" },
  {
    id: "26",
    role: "assistant",
    text: "You're welcome! Let's keep coding 🚀",
    isLoading: false,
  },
];

export const complexMessages: SynklunaLLMMessage[] = [
  {
    id: "27",
    role: "user",
    text: "Give me knowledge on AWS",
  },
  {
    id: "28",
    role: "assistant",
    text: "Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon. It offers a wide range of services that enable businesses and developers to build, deploy, and manage applications and infrastructure in the cloud. Here are some key aspects of AWS:### Core Services1. **Compute**: - **Amazon EC2 (Elastic Compute Cloud)**: Scalable virtual servers for running applications. - **AWS Lambda**: Serverless computing that runs code in response to events without provisioning servers. - **Amazon ECS/EKS**: Services for container orchestration using Docker and Kubernetes.2. **Storage**: - **Amazon S3 (Simple Storage Service)**: Object storage for data backup, archiving, and analytics. - **Amazon EBS (Elastic Block Store)**: Block storage for use with EC2 instances. - **Amazon Glacier**: Low-cost storage for data archiving and long-term backup.3. **Databases**: - **Amazon RDS (Relational Database Service)**: Managed relational databases (e.g., MySQL, PostgreSQL, SQL Server). - **Amazon DynamoDB**: Fully managed NoSQL database service. - **Amazon Redshift**: Data warehousing service for analytics.4. **Networking**: - **Amazon VPC (Virtual Private Cloud)**: Isolated network environment for resources. - **AWS Direct Connect**: Dedicated network connection from your premises to AWS. - **Amazon Route 53**: Scalable domain name system (DNS) web service.5. **Security & Identity**: - **AWS IAM (Identity and Access Management)**: Manage user access and permissions. - **AWS KMS (Key Management Service)**: Create and control encryption keys. - **AWS Shield**: DDoS protection service.### Additional Services- **Machine Learning**: Services like Amazon SageMaker for building, training, and deploying ML models.- **Analytics**: Tools like Amazon Athena for querying data in S3 and Amazon EMR for big data processing.- **Developer Tools**: Services like AWS CodeCommit, CodeBuild, and CodeDeploy for CI/CD pipelines.- **Management & Governance**: Tools like AWS CloudFormation for infrastructure as code and AWS CloudTrail for logging and monitoring.### Pricing ModelAWS operates on a pay-as-you-go pricing model, allowing users to pay only for the services they use. There are also options for reserved instances and savings plans for cost savings on long-term commitments.### Global InfrastructureAWS has a global presence with multiple regions and availability zones, ensuring high availability and redundancy for applications.### Use CasesAWS is used across various industries for:- Web hosting- Application development- Data storage and backup- Big data analytics- Machine learning and AI- Internet of Things (IoT)### Learning ResourcesAWS offers extensive documentation, tutorials, and training resources, including:- **AWS Training and Certification**: Courses and certifications for various skill levels.- **AWS Free Tier**: Allows users to explore and experiment with AWS services for free within certain limits.### ConclusionAWS is a powerful platform that provides a wide array of services to meet diverse computing needs. Its flexibility, scalability, and extensive service offerings make it a popular choice for businesses of all sizes.",
    isLoading: false,
  },
];

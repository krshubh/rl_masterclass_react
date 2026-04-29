export interface SubTopic {
  id: string;
  title: string;
  content: string;
}

export interface Topic {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

export const TOPICS: Topic[] = [
  {
    id: "foundations",
    title: "Foundations",
    subTopics: [
      {
        id: "intro-to-rl",
        title: "Introduction to RL",
        content: "![RL Banner](https://picsum.photos/seed/rl-intro/800/400)\\n\\n### What is Reinforcement Learning?\\n\\nReinforcement learning (RL) is an area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward.\\n\\nUnlike supervised learning where we have a labeled dataset, or unsupervised learning where we look for patterns, **RL is learning by trial and error.**\\n\\nKey concepts:\\n- **Agent**: The learner or decision maker (e.g., a robot, a trading bot, a video game player).\\n- **Environment**: Everything the agent interacts with (e.g., the physical world, the stock market, the game world).\\n- **Action ($A$)**: What the agent does (e.g., move left, buy stock).\\n- **State ($S$)**: The current situation of the agent.\\n- **Reward ($R$)**: Immediate feedback from the environment (e.g., +1 for reaching the goal, -1 for hitting a wall)."
      },
      {
        id: "framework",
        title: "The RL Framework",
        content: "### Markov Decision Processes (MDP)\\n\\nMost RL problems are framed as MDPs. This formalization allows us to define the interaction between the agent and the environment mathematically.\\n\\nAn MDP consists of five components:\\n- **$S$**: A set of states.\\n- **$A$**: A set of actions.\\n- **$P(s'|s, a)$**: Transition probabilities which represent the dynamics of the environment.\\n- **$R(s, a, s')$**: The reward function.\\n- **$\gamma$**: The discount factor, which determines the importance of future rewards.\\n\\n![MDP Diagram](https://picsum.photos/seed/mdp-diagram/800/300)\\n\\n#### The Goal of the Agent\\nThe goal of the agent is to find a **Policy ($\pi$)** that maximizes the expected cumulative reward, often called the **Return ($G_t$)**."
      }
    ]
  },
  {
    id: "tabular-methods",
    title: "Tabular Methods",
    subTopics: [
      {
        id: "q-learning",
        title: "Q-Learning",
        content: "### The Concept of Q-Values\\n\\nThe $Q$-value, or state-action value $Q(s, a)$, represents the expected total reward the agent will receive if it starts in state $s$, takes action $a$, and then follows the optimal policy thereafter.\\n\\n### The Q-Learning Algorithm\\n\\nQ-Learning is an **off-policy** temporal difference (TD) control algorithm. It is 'off-policy' because it learns the value of the optimal policy independently of the agent's actions.\\n\\n#### The Update Rule:\\n$Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \max_{a'} Q(s', a') - Q(s, a)]$\\n\\nWhere:\\n- $\alpha$ is the learning rate.\\n- $r$ is the immediate reward.\\n- $\gamma$ is the discount factor.\\n- $\max_{a'} Q(s', a')$ is our estimate of the optimal future value."
      },
      {
        id: "sarsa",
        title: "Sarsa",
        content: "### On-Policy Learning with Sarsa\\n\\nSarsa stands for **S-A-R-S-A**: State, Action, Reward, next State, next Action. Unlike Q-Learning, Sarsa is **on-policy**, meaning it updates its Q-values based on the action actually taken by the current policy.\\n\\n#### The Update Rule:\\n$Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma Q(s', a') - Q(s, a)]$\\n\\nCompare this with Q-Learning: Sarsa uses $Q(s', a')$ (the value of the action chosen by our policy), while Q-Learning uses $\max_{a'} Q(s', a')$ (the maximum possible value)."
      }
    ]
  },
  {
    id: "deep-rl",
    title: "Deep RL",
    subTopics: [
      {
        id: "dqn",
        title: "Deep Q-Networks (DQN)",
        content: "### Breaking the Curse of Dimensionality\\n\\nIn complex environments like Atari games, the number of possible states is astronomical. Storing every state in a table is impossible. **Deep Q-Networks (DQN)** solve this by using a Neural Network to approximate the $Q$-function: $Q(s, a; \theta) \approx Q^*(s, a)$.\\n\\n![DQN Arcitecture](https://picsum.photos/seed/dqn-network/800/400)\\n\\n#### Key Innovations:\\n1. **Experience Replay**: We store the agent's experiences $(s, a, r, s')$ in a 'replay buffer' and sample random batches from it. This breaks the temporal correlation between consecutive samples.\\n2. **Fixed Target Network**: We use two networks: a primary network that we train, and a 'target network' to generate the target $Q$-values. The target network is updated only periodically to keep training stable."
      }
    ]
  },
  {
    id: "policy-gradients",
    title: "Policy Gradients",
    subTopics: [
      {
        id: "reinforce",
        title: "REINFORCE Algorithm",
        content: "### Learning the Policy Directly\\n\\nPolicy Gradient methods don't estimate a value function. Instead, they parameterize the policy $\pi(a|s; \theta)$ and move the parameters $\theta$ in the direction that maximizes the expected return $J(\theta)$ using gradient ascent.\\n\\n#### The Policy Gradient Theorem:\\n$\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} [\nabla_\theta \log \pi_\theta(a|s) G_t]$\\n\\nREINFORCE uses Monte Carlo sampling to estimate this gradient: we run a full episode, calculate the total return $G_t$, and then update the weights for every step taken in that episode."
      },
      {
        id: "ppo",
        title: "Proximal Policy Optimization (PPO)",
        content: "### The Gold Standard: PPO\\n\\nPPO was developed by OpenAI and has become one of the most widely used RL algorithms. It solves the problem of 'collapsing performance' in vanilla policy gradients.\\n\\n#### The Clipped Objective:\\nPPO prevents the policy from changing too much in a single update step by clipping the probability ratio: \\n\\n$L^{CLIP}(\theta) = \hat{\mathbb{E}}_t [\min(r_t(\theta)\hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t)]$\\n\\nThis makes PPO much more stable and robust to hyperparameter settings than previous methods."
      }
    ]
  }
];

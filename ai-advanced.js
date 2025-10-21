/**
 * FeasiQuest Advanced AI System
 * Enhanced AI with memory, predictive analytics, and personalized learning
 */

class AdvancedAI {
    constructor(authSystem) {
        this.auth = authSystem;
        this.conversationHistory = this.loadConversationHistory();
        this.learningPaths = this.loadLearningPaths();
        this.predictions = {};
    }

    // Load conversation history
    loadConversationHistory() {
        const history = localStorage.getItem('feasiquest_ai_history');
        return history ? JSON.parse(history) : {};
    }

    // Save conversation history
    saveConversationHistory() {
        localStorage.setItem('feasiquest_ai_history', JSON.stringify(this.conversationHistory));
    }

    // Load learning paths
    loadLearningPaths() {
        const paths = localStorage.getItem('feasiquest_learning_paths');
        return paths ? JSON.parse(paths) : {};
    }

    // Save learning paths
    saveLearningPaths() {
        localStorage.setItem('feasiquest_learning_paths', JSON.stringify(this.learningPaths));
    }

    // Enhanced chat with memory
    chat(message, context = {}) {
        if (!this.auth.isAuthenticated()) {
            return {
                response: "Please log in to use the AI assistant.",
                suggestions: ["Login", "Register"]
            };
        }

        const user = this.auth.getCurrentUser();
        const userId = user.id;

        // Initialize conversation history for user
        if (!this.conversationHistory[userId]) {
            this.conversationHistory[userId] = [];
        }

        // Add user message to history
        this.conversationHistory[userId].push({
            role: 'user',
            message: message,
            timestamp: new Date().toISOString(),
            context: context
        });

        // Generate response with memory
        const response = this.generateContextualResponse(message, user, context);

        // Add AI response to history
        this.conversationHistory[userId].push({
            role: 'assistant',
            message: response.response,
            timestamp: new Date().toISOString(),
            suggestions: response.suggestions
        });

        // Keep only last 50 messages
        if (this.conversationHistory[userId].length > 50) {
            this.conversationHistory[userId] = this.conversationHistory[userId].slice(-50);
        }

        this.saveConversationHistory();

        return response;
    }

    // Generate contextual response with memory
    generateContextualResponse(message, user, context) {
        const lowerMessage = message.toLowerCase();
        const progress = user.progress;
        const history = this.conversationHistory[user.id] || [];

        // Check for follow-up questions
        const isFollowUp = this.detectFollowUp(message, history);

        // Personalized greeting
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return {
                response: `Hello ${user.firstName}! 👋 I remember we've chatted ${history.length / 2} times before. You're currently at Level ${progress.level} with ${progress.xp} XP. How can I help you today?`,
                suggestions: ["Show my progress", "What should I study next?", "Review my weak areas"]
            };
        }

        // Progress inquiry with memory
        if (lowerMessage.includes('progress') || lowerMessage.includes('how am i doing')) {
            const completionRate = Math.round((progress.modulesCompleted.length / 9) * 100);
            const prediction = this.predictSuccess(user);
            
            return {
                response: `Great question! Based on our conversations and your activity:\n\n📊 **Your Progress:**\n- Completion: ${completionRate}%\n- Modules completed: ${progress.modulesCompleted.length}/9\n- Current level: ${progress.level}\n- Total XP: ${progress.xp}\n\n🎯 **AI Prediction:** ${prediction.message}\n\n💡 **Recommendation:** ${prediction.recommendation}`,
                suggestions: ["What's next?", "Show detailed analytics", "Compare to others"]
            };
        }

        // Personalized learning path
        if (lowerMessage.includes('what should i study') || lowerMessage.includes('next module') || lowerMessage.includes('recommend')) {
            const recommendation = this.generatePersonalizedPath(user);
            return {
                response: `Based on your learning style and performance, here's my recommendation:\n\n${recommendation.explanation}\n\n📚 **Suggested Path:**\n${recommendation.path.map((m, i) => `${i + 1}. ${m.name} (${m.reason})`).join('\n')}\n\n⏱️ **Estimated time:** ${recommendation.estimatedTime}`,
                suggestions: ["Start recommended module", "See alternative paths", "Why this order?"]
            };
        }

        // Performance analysis
        if (lowerMessage.includes('weak') || lowerMessage.includes('improve') || lowerMessage.includes('struggle')) {
            const analysis = this.analyzePerformance(user);
            return {
                response: `I've analyzed your performance across all modules:\n\n💪 **Strengths:**\n${analysis.strengths.map(s => `- ${s.area}: ${s.score}% (${s.feedback})`).join('\n')}\n\n📈 **Areas for Improvement:**\n${analysis.weaknesses.map(w => `- ${w.area}: ${w.score}% (${w.suggestion})`).join('\n')}\n\n🎯 **Action Plan:** ${analysis.actionPlan}`,
                suggestions: ["Create study plan", "Review weak modules", "Practice exercises"]
            };
        }

        // Learning velocity
        if (lowerMessage.includes('how fast') || lowerMessage.includes('pace') || lowerMessage.includes('speed')) {
            const velocity = this.calculateLearningVelocity(user);
            return {
                response: `Let's look at your learning velocity:\n\n⚡ **Current Pace:**\n- Modules per week: ${velocity.modulesPerWeek}\n- Average time per module: ${velocity.avgTimePerModule}\n- Consistency score: ${velocity.consistencyScore}/10\n\n📅 **Predictions:**\n- Estimated completion: ${velocity.estimatedCompletion}\n- Compared to average: ${velocity.comparison}\n\n💡 **Tip:** ${velocity.tip}`,
                suggestions: ["Speed up learning", "Maintain current pace", "Take a break"]
            };
        }

        // Study tips based on history
        if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('help')) {
            const tips = this.generatePersonalizedTips(user, history);
            return {
                response: `Based on your learning patterns, here are personalized tips:\n\n${tips.map((tip, i) => `${i + 1}. **${tip.title}**\n   ${tip.description}`).join('\n\n')}\n\n🎯 These tips are tailored to your learning style and progress!`,
                suggestions: ["More tips", "Create study schedule", "Set learning goals"]
            };
        }

        // Comparison with peers
        if (lowerMessage.includes('compare') || lowerMessage.includes('others') || lowerMessage.includes('average')) {
            const comparison = this.compareWithPeers(user);
            return {
                response: `Here's how you compare to other learners:\n\n📊 **Your Stats vs Average:**\n- Completion rate: You ${comparison.completionDiff} (${comparison.completionRate}% vs ${comparison.avgCompletionRate}%)\n- XP earned: You ${comparison.xpDiff} (${progress.xp} vs ${comparison.avgXP})\n- Learning speed: You ${comparison.speedDiff}\n\n🏆 **Ranking:** Top ${comparison.percentile}% of learners\n\n${comparison.encouragement}`,
                suggestions: ["View leaderboard", "Set new goals", "Join study group"]
            };
        }

        // Module-specific help
        const moduleMatch = lowerMessage.match(/module (\d+)/);
        if (moduleMatch) {
            const moduleId = parseInt(moduleMatch[1]);
            const moduleHelp = this.getModuleSpecificHelp(moduleId, user);
            return {
                response: moduleHelp.response,
                suggestions: moduleHelp.suggestions
            };
        }

        // Default contextual response
        return {
            response: `I'm here to help you master clinical trial feasibility! I can assist with:\n\n- 📊 Tracking your progress and performance\n- 🎯 Recommending personalized learning paths\n- 💡 Providing study tips based on your style\n- 📈 Analyzing your strengths and weaknesses\n- ⚡ Predicting your success and completion time\n\nWhat would you like to know?`,
            suggestions: ["Show my progress", "What should I study?", "Give me tips", "Compare my performance"]
        };
    }

    // Detect follow-up questions
    detectFollowUp(message, history) {
        if (history.length < 2) return false;
        
        const lastExchange = history.slice(-2);
        const followUpIndicators = ['why', 'how', 'what about', 'tell me more', 'explain', 'can you'];
        
        return followUpIndicators.some(indicator => message.toLowerCase().includes(indicator));
    }

    // Predict success
    predictSuccess(user) {
        const progress = user.progress;
        const accountAge = this.getAccountAgeInDays(user.createdAt);
        const completionRate = progress.modulesCompleted.length / 9;
        const avgScore = this.getAverageScore(progress.assessmentScores);

        let successProbability = 0;
        let message = '';
        let recommendation = '';

        // Calculate success probability
        if (accountAge > 0) {
            const velocity = progress.modulesCompleted.length / accountAge;
            successProbability = Math.min(100, Math.round(
                (completionRate * 40) + 
                (avgScore * 0.3) + 
                (velocity * 100 * 20) +
                (progress.xp / 20)
            ));
        }

        if (successProbability >= 80) {
            message = `Excellent! You have an ${successProbability}% probability of completing the certification. You're on track for success! 🎉`;
            recommendation = "Keep up the great work! Consider helping other learners or exploring advanced topics.";
        } else if (successProbability >= 60) {
            message = `Good progress! You have a ${successProbability}% probability of completion. You're doing well but there's room for improvement.`;
            recommendation = "Focus on consistency. Try to complete at least one module per week to stay on track.";
        } else if (successProbability >= 40) {
            message = `You have a ${successProbability}% probability of completion. Let's work on improving your pace and engagement.`;
            recommendation = "Set specific study times and break modules into smaller chunks. Consider joining a study group for motivation.";
        } else {
            message = `Your completion probability is ${successProbability}%. Don't worry - we can turn this around!`;
            recommendation = "Let's create a personalized recovery plan. Start with shorter study sessions and gradually increase. I'm here to help!";
        }

        return { probability: successProbability, message, recommendation };
    }

    // Generate personalized learning path
    generatePersonalizedPath(user) {
        const progress = user.progress;
        const completed = progress.modulesCompleted;
        const scores = progress.assessmentScores;

        const allModules = [
            { id: 1, name: 'Feasibility Foundations', difficulty: 'beginner', prereq: [] },
            { id: 2, name: 'Patient Population & Recruitment', difficulty: 'beginner', prereq: [1] },
            { id: 3, name: 'Site Selection & Capability', difficulty: 'intermediate', prereq: [1, 2] },
            { id: 4, name: 'Budget & Resource Planning', difficulty: 'intermediate', prereq: [1] },
            { id: 5, name: 'Timeline & Milestone Assessment', difficulty: 'intermediate', prereq: [1, 4] },
            { id: 6, name: 'Risk Identification & Mitigation', difficulty: 'advanced', prereq: [1, 2, 3] },
            { id: 7, name: 'Regulatory & Compliance', difficulty: 'advanced', prereq: [1] },
            { id: 8, name: 'Technology & Data Management', difficulty: 'advanced', prereq: [1] },
            { id: 9, name: 'Final Assessment & Certification', difficulty: 'expert', prereq: [1, 2, 3, 4, 5, 6, 7, 8] }
        ];

        // Filter remaining modules
        const remaining = allModules.filter(m => !completed.includes(m.id));

        if (remaining.length === 0) {
            return {
                explanation: "🎉 Congratulations! You've completed all modules!",
                path: [],
                estimatedTime: "0 hours"
            };
        }

        // Sort by difficulty and prerequisites
        const sortedPath = remaining
            .filter(m => m.prereq.every(p => completed.includes(p)))
            .sort((a, b) => {
                const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            })
            .slice(0, 3)
            .map(m => ({
                ...m,
                reason: this.getModuleReason(m, scores, completed)
            }));

        const estimatedTime = `${sortedPath.length * 25} minutes`;

        return {
            explanation: `I've analyzed your progress and learning style. Here's an optimized path that builds on your strengths while addressing knowledge gaps.`,
            path: sortedPath,
            estimatedTime: estimatedTime
        };
    }

    // Get module-specific reason
    getModuleReason(module, scores, completed) {
        if (module.difficulty === 'beginner') {
            return 'Foundation building';
        } else if (module.difficulty === 'intermediate') {
            return 'Practical application';
        } else if (module.difficulty === 'advanced') {
            return 'Advanced concepts';
        } else {
            return 'Final certification';
        }
    }

    // Analyze performance
    analyzePerformance(user) {
        const scores = user.progress.assessmentScores;
        const moduleNames = {
            1: 'Feasibility Foundations',
            2: 'Patient Recruitment',
            3: 'Site Selection'
        };

        const strengths = [];
        const weaknesses = [];

        for (const [moduleId, score] of Object.entries(scores)) {
            const moduleName = moduleNames[moduleId] || `Module ${moduleId}`;
            
            if (score >= 80) {
                strengths.push({
                    area: moduleName,
                    score: score,
                    feedback: 'Excellent mastery!'
                });
            } else if (score < 70) {
                weaknesses.push({
                    area: moduleName,
                    score: score,
                    suggestion: 'Review key concepts and practice more'
                });
            }
        }

        let actionPlan = '';
        if (weaknesses.length > 0) {
            actionPlan = `Focus on reviewing ${weaknesses[0].area} first, then move to other areas. Practice with real-world scenarios.`;
        } else if (strengths.length > 0) {
            actionPlan = 'Great job! Continue to the next modules and maintain this level of excellence.';
        } else {
            actionPlan = 'Complete more assessments to get personalized feedback.';
        }

        return { strengths, weaknesses, actionPlan };
    }

    // Calculate learning velocity
    calculateLearningVelocity(user) {
        const progress = user.progress;
        const accountAge = this.getAccountAgeInDays(user.createdAt);
        const completed = progress.modulesCompleted.length;

        const modulesPerWeek = accountAge > 0 ? (completed / accountAge * 7).toFixed(1) : 0;
        const avgTimePerModule = completed > 0 ? Math.round(progress.totalTimeSpent / completed) : 0;
        
        // Calculate consistency (simplified)
        const consistencyScore = Math.min(10, Math.round(modulesPerWeek * 2));

        // Estimate completion
        const remaining = 9 - completed;
        const daysToComplete = modulesPerWeek > 0 ? Math.ceil(remaining / (modulesPerWeek / 7)) : 0;
        const completionDate = new Date();
        completionDate.setDate(completionDate.getDate() + daysToComplete);

        let comparison = '';
        if (modulesPerWeek >= 2) {
            comparison = 'Faster than average! 🚀';
        } else if (modulesPerWeek >= 1) {
            comparison = 'On pace with average learners';
        } else {
            comparison = 'Slower than average - consider increasing study time';
        }

        let tip = '';
        if (consistencyScore < 5) {
            tip = 'Try to study at the same time each day to build a habit.';
        } else if (consistencyScore < 8) {
            tip = 'Good consistency! Consider adding one more study session per week.';
        } else {
            tip = 'Excellent consistency! You\'re building strong learning habits.';
        }

        return {
            modulesPerWeek: modulesPerWeek,
            avgTimePerModule: `${avgTimePerModule} min`,
            consistencyScore: consistencyScore,
            estimatedCompletion: this.formatDate(completionDate.toISOString()),
            comparison: comparison,
            tip: tip
        };
    }

    // Generate personalized tips
    generatePersonalizedTips(user, history) {
        const progress = user.progress;
        const tips = [];

        // Tip based on completion rate
        if (progress.modulesCompleted.length < 3) {
            tips.push({
                title: 'Build Momentum',
                description: 'Complete one module per week to build a strong foundation. Small, consistent steps lead to big results!'
            });
        }

        // Tip based on scores
        const avgScore = this.getAverageScore(progress.assessmentScores);
        if (avgScore < 70) {
            tips.push({
                title: 'Active Learning',
                description: 'Take notes while studying and try to explain concepts in your own words. This improves retention by 50%!'
            });
        }

        // Tip based on XP
        if (progress.xp < 500) {
            tips.push({
                title: 'Engage More',
                description: 'Complete all interactive exercises and case studies to earn more XP and deepen your understanding.'
            });
        }

        // General tips
        tips.push({
            title: 'Spaced Repetition',
            description: 'Review completed modules every few days. This technique improves long-term retention significantly.'
        });

        tips.push({
            title: 'Real-World Application',
            description: 'Try to relate each concept to real clinical trials you know about. This makes learning more meaningful and memorable.'
        });

        return tips.slice(0, 3);
    }

    // Compare with peers
    compareWithPeers(user) {
        // Simulated peer data (in production, calculate from actual users)
        const avgCompletionRate = 45;
        const avgXP = 800;
        const avgSpeed = 1.2;

        const userCompletionRate = Math.round((user.progress.modulesCompleted.length / 9) * 100);
        const userSpeed = this.getAccountAgeInDays(user.createdAt) > 0 
            ? user.progress.modulesCompleted.length / this.getAccountAgeInDays(user.createdAt) * 7
            : 0;

        const completionDiff = userCompletionRate > avgCompletionRate ? 'are ahead' : 'are behind';
        const xpDiff = user.progress.xp > avgXP ? 'have more XP' : 'have less XP';
        const speedDiff = userSpeed > avgSpeed ? 'are learning faster' : 'are learning slower';

        const percentile = Math.min(99, Math.round(
            ((userCompletionRate / 100) * 40) + 
            ((user.progress.xp / 2000) * 30) +
            ((userSpeed / 3) * 30)
        ));

        let encouragement = '';
        if (percentile >= 75) {
            encouragement = '🌟 Outstanding! You\'re in the top quarter of all learners. Keep up the excellent work!';
        } else if (percentile >= 50) {
            encouragement = '👍 Good job! You\'re performing above average. Push a bit more to reach the top tier!';
        } else {
            encouragement = '💪 You\'re making progress! With consistent effort, you can move up the rankings quickly.';
        }

        return {
            completionRate: userCompletionRate,
            avgCompletionRate: avgCompletionRate,
            completionDiff: completionDiff,
            xpDiff: xpDiff,
            speedDiff: speedDiff,
            avgXP: avgXP,
            percentile: percentile,
            encouragement: encouragement
        };
    }

    // Get module-specific help
    getModuleSpecificHelp(moduleId, user) {
        const moduleContent = {
            1: {
                name: 'Feasibility Foundations',
                tips: [
                    'Focus on understanding the Five Pillars framework',
                    'Practice identifying red flags in protocols',
                    'Review real-world case studies carefully'
                ],
                commonMistakes: [
                    'Overlooking patient population size',
                    'Ignoring timeline constraints',
                    'Missing regulatory requirements'
                ]
            },
            2: {
                name: 'Patient Population & Recruitment',
                tips: [
                    'Master the patient pool calculator',
                    'Understand inclusion/exclusion criteria impact',
                    'Learn recruitment strategy optimization'
                ],
                commonMistakes: [
                    'Overestimating recruitment rates',
                    'Ignoring geographic constraints',
                    'Underestimating screening failures'
                ]
            },
            3: {
                name: 'Site Selection & Capability',
                tips: [
                    'Evaluate all six capability dimensions',
                    'Practice site scoring methodology',
                    'Understand infrastructure requirements'
                ],
                commonMistakes: [
                    'Focusing only on patient volume',
                    'Ignoring staff qualifications',
                    'Overlooking technology requirements'
                ]
            }
        };

        const module = moduleContent[moduleId] || {
            name: `Module ${moduleId}`,
            tips: ['Review the module content carefully', 'Complete all interactive exercises'],
            commonMistakes: ['Rushing through content', 'Skipping practice scenarios']
        };

        const completed = user.progress.modulesCompleted.includes(moduleId);
        const score = user.progress.assessmentScores[moduleId];

        let response = `📚 **${module.name}**\n\n`;
        
        if (completed && score) {
            response += `✅ You completed this module with a score of ${score}%.\n\n`;
            if (score < 70) {
                response += `💡 **Recommendation:** Consider reviewing this module to strengthen your understanding.\n\n`;
            }
        } else if (completed) {
            response += `✅ You've completed this module!\n\n`;
        } else {
            response += `📖 This module is next in your learning path.\n\n`;
        }

        response += `**Key Tips:**\n${module.tips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}\n\n`;
        response += `**Common Mistakes to Avoid:**\n${module.commonMistakes.map((mistake, i) => `${i + 1}. ${mistake}`).join('\n')}`;

        return {
            response: response,
            suggestions: completed ? ["Review module", "Take practice quiz", "Next module"] : ["Start module", "Preview content", "See prerequisites"]
        };
    }

    // Helper functions
    getAccountAgeInDays(createdAt) {
        const created = new Date(createdAt);
        const now = new Date();
        return Math.floor((now - created) / (1000 * 60 * 60 * 24));
    }

    getAverageScore(scores) {
        const values = Object.values(scores);
        if (values.length === 0) return 0;
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    }

    formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Clear conversation history
    clearHistory(userId) {
        if (userId) {
            delete this.conversationHistory[userId];
        } else if (this.auth.isAuthenticated()) {
            const user = this.auth.getCurrentUser();
            delete this.conversationHistory[user.id];
        }
        this.saveConversationHistory();
    }

    // Get conversation summary
    getConversationSummary() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = this.auth.getCurrentUser();
        const history = this.conversationHistory[user.id] || [];

        const userMessages = history.filter(m => m.role === 'user').length;
        const topics = this.extractTopics(history);

        return {
            success: true,
            summary: {
                totalMessages: history.length,
                userMessages: userMessages,
                aiResponses: history.length - userMessages,
                topics: topics,
                firstInteraction: history.length > 0 ? history[0].timestamp : null,
                lastInteraction: history.length > 0 ? history[history.length - 1].timestamp : null
            }
        };
    }

    // Extract topics from conversation
    extractTopics(history) {
        const topics = new Set();
        const keywords = {
            'progress': ['progress', 'completion', 'status'],
            'recommendations': ['recommend', 'suggest', 'next', 'should'],
            'performance': ['score', 'performance', 'weak', 'strong'],
            'help': ['help', 'tip', 'advice', 'how to']
        };

        history.forEach(msg => {
            const text = msg.message.toLowerCase();
            for (const [topic, words] of Object.entries(keywords)) {
                if (words.some(word => text.includes(word))) {
                    topics.add(topic);
                }
            }
        });

        return Array.from(topics);
    }
}

// Initialize advanced AI system
const advancedAI = new AdvancedAI(authSystem);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedAI;
}
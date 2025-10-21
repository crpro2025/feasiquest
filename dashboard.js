/**
 * FeasiQuest Admin Dashboard
 * Progress tracking, analytics, and user management
 */

class DashboardSystem {
    constructor(authSystem) {
        this.auth = authSystem;
        this.analytics = this.loadAnalytics();
    }

    // Load analytics data
    loadAnalytics() {
        const analytics = localStorage.getItem('feasiquest_analytics');
        return analytics ? JSON.parse(analytics) : {
            totalUsers: 0,
            activeUsers: 0,
            completionRate: 0,
            averageScore: 0,
            moduleStats: {},
            dailyActivity: []
        };
    }

    // Save analytics data
    saveAnalytics() {
        localStorage.setItem('feasiquest_analytics', JSON.stringify(this.analytics));
    }

    // Get user dashboard data
    getUserDashboard() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = this.auth.getCurrentUser();
        const progress = user.progress;

        // Calculate completion percentage
        const totalModules = 9;
        const completedModules = progress.modulesCompleted.length;
        const completionPercentage = Math.round((completedModules / totalModules) * 100);

        // Calculate average score
        const scores = Object.values(progress.assessmentScores);
        const averageScore = scores.length > 0 
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

        // Get next recommended module
        const nextModule = this.getNextRecommendedModule(progress);

        // Calculate learning velocity (modules per week)
        const accountAge = this.getAccountAgeInDays(user.createdAt);
        const learningVelocity = accountAge > 0 
            ? (completedModules / accountAge * 7).toFixed(1)
            : 0;

        // Get recent activity
        const recentActivity = this.getRecentActivity(user);

        // Get achievements
        const achievements = this.getAchievements(progress);

        // Predict completion date
        const predictedCompletion = this.predictCompletionDate(progress, accountAge);

        return {
            success: true,
            dashboard: {
                user: {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    organization: user.organization,
                    avatar: user.profile.avatar,
                    memberSince: this.formatDate(user.createdAt)
                },
                progress: {
                    completionPercentage: completionPercentage,
                    completedModules: completedModules,
                    totalModules: totalModules,
                    xp: progress.xp,
                    level: progress.level,
                    badges: progress.badges.length,
                    averageScore: averageScore,
                    totalTimeSpent: this.formatTime(progress.totalTimeSpent)
                },
                insights: {
                    learningVelocity: learningVelocity,
                    predictedCompletion: predictedCompletion,
                    nextModule: nextModule,
                    strengths: this.identifyStrengths(progress),
                    areasForImprovement: this.identifyWeaknesses(progress)
                },
                recentActivity: recentActivity,
                achievements: achievements
            }
        };
    }

    // Get admin dashboard data
    getAdminDashboard() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = this.auth.getCurrentUser();
        if (user.profile.role !== 'Admin') {
            return { success: false, error: 'Unauthorized - Admin access required' };
        }

        const allUsersResult = this.auth.getAllUsers();
        if (!allUsersResult.success) {
            return allUsersResult;
        }

        const users = allUsersResult.users;

        // Calculate overall statistics
        const stats = this.calculateOverallStats(users);

        // Get module performance
        const modulePerformance = this.calculateModulePerformance(users);

        // Get user leaderboard
        const leaderboard = this.generateLeaderboard(users);

        // Get engagement metrics
        const engagement = this.calculateEngagementMetrics(users);

        // Get completion funnel
        const funnel = this.calculateCompletionFunnel(users);

        return {
            success: true,
            dashboard: {
                overview: stats,
                modulePerformance: modulePerformance,
                leaderboard: leaderboard,
                engagement: engagement,
                funnel: funnel,
                users: users.map(u => ({
                    id: u.id,
                    name: `${u.firstName} ${u.lastName}`,
                    email: u.email,
                    organization: u.organization,
                    progress: u.progress,
                    lastActive: u.progress.lastActive,
                    createdAt: u.createdAt
                }))
            }
        };
    }

    // Calculate overall statistics
    calculateOverallStats(users) {
        const totalUsers = users.length;
        const activeUsers = users.filter(u => this.isActiveUser(u)).length;
        
        const completionRates = users.map(u => 
            (u.progress.modulesCompleted.length / 9) * 100
        );
        const avgCompletionRate = completionRates.length > 0
            ? Math.round(completionRates.reduce((a, b) => a + b, 0) / completionRates.length)
            : 0;

        const allScores = users.flatMap(u => Object.values(u.progress.assessmentScores));
        const avgScore = allScores.length > 0
            ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
            : 0;

        const totalXP = users.reduce((sum, u) => sum + u.progress.xp, 0);
        const totalTime = users.reduce((sum, u) => sum + u.progress.totalTimeSpent, 0);

        return {
            totalUsers: totalUsers,
            activeUsers: activeUsers,
            averageCompletionRate: avgCompletionRate,
            averageScore: avgScore,
            totalXP: totalXP,
            totalTimeSpent: this.formatTime(totalTime),
            completedCertifications: users.filter(u => u.progress.modulesCompleted.length === 9).length
        };
    }

    // Calculate module performance
    calculateModulePerformance(users) {
        const modules = [
            'Feasibility Foundations',
            'Patient Population & Recruitment',
            'Site Selection & Capability',
            'Budget & Resource Planning',
            'Timeline & Milestone Assessment',
            'Risk Identification & Mitigation',
            'Regulatory & Compliance',
            'Technology & Data Management',
            'Final Assessment & Certification'
        ];

        return modules.map((moduleName, index) => {
            const moduleId = index + 1;
            const completedCount = users.filter(u => 
                u.progress.modulesCompleted.includes(moduleId)
            ).length;

            const scores = users
                .filter(u => u.progress.assessmentScores[moduleId])
                .map(u => u.progress.assessmentScores[moduleId]);

            const avgScore = scores.length > 0
                ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                : 0;

            return {
                moduleId: moduleId,
                moduleName: moduleName,
                completionRate: Math.round((completedCount / users.length) * 100),
                averageScore: avgScore,
                completedUsers: completedCount,
                totalUsers: users.length
            };
        });
    }

    // Generate leaderboard
    generateLeaderboard(users) {
        return users
            .map(u => ({
                name: `${u.firstName} ${u.lastName}`,
                organization: u.organization,
                xp: u.progress.xp,
                level: u.progress.level,
                badges: u.progress.badges.length,
                completedModules: u.progress.modulesCompleted.length,
                avatar: u.profile.avatar
            }))
            .sort((a, b) => b.xp - a.xp)
            .slice(0, 10);
    }

    // Calculate engagement metrics
    calculateEngagementMetrics(users) {
        const now = new Date();
        const last7Days = users.filter(u => {
            const lastActive = new Date(u.progress.lastActive);
            const daysDiff = (now - lastActive) / (1000 * 60 * 60 * 24);
            return daysDiff <= 7;
        }).length;

        const last30Days = users.filter(u => {
            const lastActive = new Date(u.progress.lastActive);
            const daysDiff = (now - lastActive) / (1000 * 60 * 60 * 24);
            return daysDiff <= 30;
        }).length;

        return {
            activeLastWeek: last7Days,
            activeLastMonth: last30Days,
            engagementRate: Math.round((last7Days / users.length) * 100),
            averageSessionTime: this.calculateAverageSessionTime(users)
        };
    }

    // Calculate completion funnel
    calculateCompletionFunnel(users) {
        const stages = [
            { name: 'Registered', count: users.length },
            { name: 'Started Module 1', count: users.filter(u => u.progress.modulesCompleted.length >= 1).length },
            { name: 'Completed 3 Modules', count: users.filter(u => u.progress.modulesCompleted.length >= 3).length },
            { name: 'Completed 6 Modules', count: users.filter(u => u.progress.modulesCompleted.length >= 6).length },
            { name: 'Certified', count: users.filter(u => u.progress.modulesCompleted.length === 9).length }
        ];

        return stages.map((stage, index) => ({
            ...stage,
            percentage: users.length > 0 ? Math.round((stage.count / users.length) * 100) : 0,
            dropoff: index > 0 ? stages[index - 1].count - stage.count : 0
        }));
    }

    // Get next recommended module
    getNextRecommendedModule(progress) {
        const completedModules = progress.modulesCompleted;
        const allModules = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const remainingModules = allModules.filter(m => !completedModules.includes(m));

        if (remainingModules.length === 0) {
            return { id: null, name: 'All modules completed!', reason: 'Congratulations!' };
        }

        const nextModule = remainingModules[0];
        const moduleNames = {
            1: 'Feasibility Foundations',
            2: 'Patient Population & Recruitment',
            3: 'Site Selection & Capability',
            4: 'Budget & Resource Planning',
            5: 'Timeline & Milestone Assessment',
            6: 'Risk Identification & Mitigation',
            7: 'Regulatory & Compliance',
            8: 'Technology & Data Management',
            9: 'Final Assessment & Certification'
        };

        return {
            id: nextModule,
            name: moduleNames[nextModule],
            reason: 'Continue your learning journey'
        };
    }

    // Identify strengths
    identifyStrengths(progress) {
        const scores = progress.assessmentScores;
        const strengths = [];

        const moduleNames = {
            1: 'Feasibility Foundations',
            2: 'Patient Recruitment',
            3: 'Site Selection'
        };

        for (const [moduleId, score] of Object.entries(scores)) {
            if (score >= 80) {
                strengths.push({
                    module: moduleNames[moduleId] || `Module ${moduleId}`,
                    score: score
                });
            }
        }

        return strengths.slice(0, 3);
    }

    // Identify weaknesses
    identifyWeaknesses(progress) {
        const scores = progress.assessmentScores;
        const weaknesses = [];

        const moduleNames = {
            1: 'Feasibility Foundations',
            2: 'Patient Recruitment',
            3: 'Site Selection'
        };

        for (const [moduleId, score] of Object.entries(scores)) {
            if (score < 70) {
                weaknesses.push({
                    module: moduleNames[moduleId] || `Module ${moduleId}`,
                    score: score,
                    recommendation: 'Review this module for better understanding'
                });
            }
        }

        return weaknesses.slice(0, 3);
    }

    // Get recent activity
    getRecentActivity(user) {
        const activities = [];
        const progress = user.progress;

        // Add module completions
        progress.modulesCompleted.forEach(moduleId => {
            activities.push({
                type: 'module_completed',
                description: `Completed Module ${moduleId}`,
                timestamp: progress.lastActive
            });
        });

        // Add badge earnings
        progress.badges.forEach(badge => {
            activities.push({
                type: 'badge_earned',
                description: `Earned ${badge} badge`,
                timestamp: progress.lastActive
            });
        });

        return activities.slice(0, 5);
    }

    // Get achievements
    getAchievements(progress) {
        const achievements = [];

        if (progress.modulesCompleted.length >= 1) {
            achievements.push({ name: 'First Steps', description: 'Completed your first module' });
        }
        if (progress.modulesCompleted.length >= 3) {
            achievements.push({ name: 'Making Progress', description: 'Completed 3 modules' });
        }
        if (progress.modulesCompleted.length >= 5) {
            achievements.push({ name: 'Halfway There', description: 'Completed 5 modules' });
        }
        if (progress.modulesCompleted.length === 9) {
            achievements.push({ name: 'Certified Expert', description: 'Completed all modules' });
        }
        if (progress.xp >= 1000) {
            achievements.push({ name: 'XP Master', description: 'Earned 1000+ XP' });
        }

        return achievements;
    }

    // Predict completion date
    predictCompletionDate(progress, accountAgeInDays) {
        const completedModules = progress.modulesCompleted.length;
        const remainingModules = 9 - completedModules;

        if (remainingModules === 0) {
            return 'Completed!';
        }

        if (accountAgeInDays === 0 || completedModules === 0) {
            return 'Not enough data';
        }

        const daysPerModule = accountAgeInDays / completedModules;
        const daysToComplete = Math.ceil(daysPerModule * remainingModules);
        const completionDate = new Date();
        completionDate.setDate(completionDate.getDate() + daysToComplete);

        return this.formatDate(completionDate.toISOString());
    }

    // Helper functions
    isActiveUser(user) {
        const lastActive = new Date(user.progress.lastActive);
        const now = new Date();
        const daysDiff = (now - lastActive) / (1000 * 60 * 60 * 24);
        return daysDiff <= 30;
    }

    getAccountAgeInDays(createdAt) {
        const created = new Date(createdAt);
        const now = new Date();
        return Math.floor((now - created) / (1000 * 60 * 60 * 24));
    }

    calculateAverageSessionTime(users) {
        const totalTime = users.reduce((sum, u) => sum + u.progress.totalTimeSpent, 0);
        const totalSessions = users.reduce((sum, u) => sum + u.progress.modulesCompleted.length, 0);
        
        if (totalSessions === 0) return '0 min';
        
        const avgMinutes = Math.round(totalTime / totalSessions);
        return this.formatTime(avgMinutes);
    }

    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Export data to CSV
    exportToCSV(data, filename) {
        const csv = this.convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    convertToCSV(data) {
        if (!data || data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const rows = data.map(row => 
            headers.map(header => JSON.stringify(row[header] || '')).join(',')
        );
        
        return [headers.join(','), ...rows].join('\n');
    }
}

// Initialize dashboard system
const dashboardSystem = new DashboardSystem(authSystem);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardSystem;
}
import { useEffect, useState } from "react";

import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle,
  Clock,
  Eye,
  Flag,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - in real app, this would come from props or context
const pendingCreators = 12;
const pendingBrands = 8;
const reportedVideos = 25;
const messages = 18;

const recentActivities = [
  {
    id: 1,
    type: "creator_approved",
    message: "Sarah Johnson's creator profile approved",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "video_reported",
    message: "New video reported for inappropriate content",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    id: 3,
    type: "brand_pending",
    message: "TechCorp Inc. brand profile awaiting review",
    time: "1 hour ago",
    status: "info",
  },
  {
    id: 4,
    type: "campaign_approved",
    message: "Summer Fashion Campaign approved",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 5,
    type: "creator_rejected",
    message: "Mike Chen's profile rejected - incomplete documents",
    time: "3 hours ago",
    status: "error",
  },
];

const statsData = [
  {
    title: "Total Creators",
    value: 2847,
    change: "+12%",
    changeType: "increase",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Brands",
    value: 156,
    change: "+8%",
    changeType: "increase",
    icon: Building2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Campaigns",
    value: 89,
    change: "+23%",
    changeType: "increase",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Monthly Revenue",
    value: 45200,
    change: "+18%",
    changeType: "increase",
    icon: BarChart3,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

const quickActions = [
  {
    title: "Review Creators",
    description: "Check pending creator applications",
    icon: Users,
    count: pendingCreators,
    variant: "warning" as const,
    action: "Review",
  },
  {
    title: "Brand Approvals",
    description: "Review brand profile submissions",
    icon: Building2,
    count: pendingBrands,
    variant: "info" as const,
    action: "Review",
  },
  {
    title: "Video Moderation",
    description: "Handle reported video content",
    icon: Flag,
    count: reportedVideos,
    variant: "destructive" as const,
    action: "Moderate",
  },
  {
    title: "Customer Messages",
    description: "Respond to user inquiries",
    icon: MessageSquare,
    count: messages,
    variant: "default" as const,
    action: "Reply",
  },
];

export function DashboardOverview() {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Initialize counters to 0
    const initialCounters: { [key: string]: number } = {};
    statsData.forEach((stat) => {
      initialCounters[stat.title] = 0;
    });
    setCounters(initialCounters);

    // Start animation after a short delay
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    const animationDuration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (animationDuration / 1000) * frameRate;
    let currentFrame = 0;

    const animate = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const newCounters: { [key: string]: number } = {};
      statsData.forEach((stat) => {
        const targetValue = stat.value;
        const currentValue = Math.round(targetValue * easeOutQuart);
        newCounters[stat.title] = currentValue;
      });

      setCounters(newCounters);

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  const formatNumber = (num: number, title: string) => {
    if (title === "Monthly Revenue") {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Moderator!</h1>
            <p className="mt-1 text-emerald-100">
              Here's what's happening on the platform today
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-100">Current Time</p>
            <p className="text-lg font-semibold">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(counters[stat.title] || 0, stat.title)}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      {stat.changeType === "increase" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className={`rounded-full p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={index}
                    className="group cursor-pointer rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${action.bgColor}`}>
                          <Icon className={`h-5 w-5 ${action.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant={action.variant} className="text-xs">
                        {action.count}
                      </Badge>
                    </div>
                    <Button variant="emerald" size="sm" className="mt-3 w-full">
                      {action.action}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 rounded-lg border p-3 ${getStatusColor(activity.status)}`}
                >
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Platform Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">98.5%</h3>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="mt-1 text-xs text-green-600">Excellent</p>
            </div>

            <div className="text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">2,847</h3>
              <p className="text-sm text-gray-600">Active Creators</p>
              <p className="mt-1 text-xs text-blue-600">+12 this week</p>
            </div>

            <div className="text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">89</h3>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="mt-1 text-xs text-emerald-600">+5 this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-900">
              {pendingCreators}
            </div>
            <div className="text-sm text-blue-700">Pending Creators</div>
            <Button variant="emerald" size="sm" className="mt-2 w-full">
              Review Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-900">
              {pendingBrands}
            </div>
            <div className="text-sm text-green-700">Pending Brands</div>
            <Button variant="emerald" size="sm" className="mt-2 w-full">
              Review Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-900">
              {reportedVideos}
            </div>
            <div className="text-sm text-red-700">Reported Videos</div>
            <Button variant="emerald" size="sm" className="mt-2 w-full">
              Moderate Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-900">{messages}</div>
            <div className="text-sm text-purple-700">Unread Messages</div>
            <Button variant="emerald" size="sm" className="mt-2 w-full">
              Reply Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/volunteer-1.png",
    points: 1250,
    tasksCompleted: 42,
    badges: ["Resume Expert", "Interview Pro", "Mentor"],
    rank: 1,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/volunteer-2.png",
    points: 980,
    tasksCompleted: 35,
    badges: ["Career Coach", "Tech Specialist"],
    rank: 2,
  },
  {
    id: 3,
    name: "Jessica Williams",
    avatar: "/volunteer-3.png",
    points: 870,
    tasksCompleted: 29,
    badges: ["HR Professional", "Cover Letter Expert"],
    rank: 3,
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "/volunteer-4.png",
    points: 720,
    tasksCompleted: 24,
    badges: ["LinkedIn Guru"],
    rank: 4,
  },
  {
    id: 5,
    name: "Emily Taylor",
    avatar: "/volunteer-5.png",
    points: 650,
    tasksCompleted: 21,
    badges: ["Resume Reviewer"],
    rank: 5,
  },
]

export function VolunteerLeaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Volunteer Leaderboard
        </CardTitle>
        <CardDescription>Top volunteers making a difference this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {leaderboardData.map((volunteer) => (
            <div
              key={volunteer.id}
              className={`flex items-center justify-between ${volunteer.rank <= 3 ? "p-3 rounded-lg bg-muted/50" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 text-center font-medium">
                  {volunteer.rank === 1 ? (
                    <Trophy className="h-6 w-6 text-yellow-500 mx-auto" />
                  ) : volunteer.rank === 2 ? (
                    <Medal className="h-6 w-6 text-gray-400 mx-auto" />
                  ) : volunteer.rank === 3 ? (
                    <Award className="h-6 w-6 text-amber-700 mx-auto" />
                  ) : (
                    `#${volunteer.rank}`
                  )}
                </div>
                <Avatar className="h-10 w-10 border-2 border-primary/10">
                  <AvatarImage src={volunteer.avatar || "/placeholder.svg"} alt={volunteer.name} />
                  <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{volunteer.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {volunteer.badges.slice(0, 2).map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                    {volunteer.badges.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{volunteer.badges.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{volunteer.points} pts</p>
                <p className="text-xs text-muted-foreground">{volunteer.tasksCompleted} tasks</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

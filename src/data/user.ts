export interface UserProfile {
    name: string;
    age: number;
    grade: number;
    school: string;
    city: string;
    xp: number;
    earnings: number;
    testGrade: string;
}

export const mockLeaderboard: UserProfile[] = [
    { name: "Arjun Mehta", age: 14, grade: 9, school: "DPS North", city: "Bangalore", xp: 4500, earnings: 1200, testGrade: "A+" },
    { name: "Sanya Iyer", age: 13, grade: 8, school: "Bishop Cotton", city: "Bangalore", xp: 4200, earnings: 900, testGrade: "A" },
    { name: "Rahul Singh", age: 17, grade: 12, school: "KV Hebbal", city: "Bangalore", xp: 3800, earnings: 2500, testGrade: "A-" },
    { name: "Priya Das", age: 11, grade: 6, school: "National Public School", city: "Bangalore", xp: 3500, earnings: 450, testGrade: "B+" },
    { name: "Ishaan Goel", age: 15, grade: 10, school: "Inventure Academy", city: "Bangalore", xp: 3100, earnings: 1800, testGrade: "A" },
    { name: "Ananya Reddy", age: 12, grade: 7, school: "Greenwood High", city: "Bangalore", xp: 2900, earnings: 600, testGrade: "B" },
];

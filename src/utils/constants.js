export const DIFFICULTY_STYLES = {
  Easy: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Hard: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export const STATUS_STYLES = {
  Solved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Attempted: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  Todo: "border-slate-500/30 bg-slate-500/10 text-slate-300",
};

export const LANGUAGES = ["Java", "JavaScript", "Python", "C++"];

export const STARTER_CODE = {
  Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
  JavaScript: `function twoSum(nums, target) {
  // Write your solution here
  return [];
}`,
  Python: `class Solution:
    def twoSum(self, nums, target):
        # Write your solution here
        return []`,
  "C++": `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
};

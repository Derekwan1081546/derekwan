---
sidebar_position: 1
---
# Leetcode-1
## 題目說明
給一個nums陣列和一個 target，找出nums陣列中兩數相加等於 target 的 index。
### 限制條件：
- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
只有一個有效答案。
## 解題思路
執行雙重迴圈，第一個迴圈為從頭到尾，第二個迴圈為從第一個迴圈的下一個值開始到結束，來判斷是否已符合的元素，最後再將符合的index `push back` 到 `vector` 裡面就完成了。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> arr;
        for(int i=0;i<nums.size();i++){
            for(int j=i+1;j<nums.size();j++){
                if(nums[i]+nums[j] == target){
                    arr.push_back(i);
                    arr.push_back(j);
                }
            }
        }
        return arr;
    }
};
```
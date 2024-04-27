
# Leetcode-1. Two Sum
## 題目說明
給一個nums陣列和一個 target，找出nums陣列中兩數相加等於 target 的 index。
### 限制條件：
- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
只有一個有效答案。
## 解題思路
1.暴力法:執行雙重迴圈，第一個迴圈為從頭到尾，第二個迴圈為從第一個迴圈的下一個值開始到結束，來判斷是否已符合的元素，最後再將符合的index `push back` 到 `vector` 裡面就完成了。3
2.Hash table:使用 `unordered_map<int, int>` 存放資料，`key` 存放 `nums` 裡面的元素的值，`value` 存放該值的 `index`。當每次訪問 `nums` 的元素時，若 `target - nums[i]` 的值在 `map` 中有出現表示找到答案，即為 `map[target - nums[i]]` 和 `i`，若沒出現則將 `{nums[i]], i}` 插入 `map`。
## 參考解法

```cpp title="C++ Solution 1: (Brute Force)" showLineNumbers
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


```cpp title="C++ Solution 2: (Hash Table)" showLineNumbers
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target)
    {
        unordered_map<int, int> m;
        for (int i = 0; i < nums.size(); ++i)
        {
            if (m.count(target - nums[i])) return { m[target - nums[i]], i };
            m[nums[i]] = i;
        }
        return {};
    }
};
```

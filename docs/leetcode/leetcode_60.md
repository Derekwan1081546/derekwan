---
sidebar_position: 3
---
# Leetcode-60
## 題目說明
給一個陣列和一個 target，找出陣列中兩數相加等於 target 的 index。
## 解題思路
使用 `unordered_map<int, int>` 存放資料，key 存放 nums 裡面的元素的值，value 存放該值的 index。當每次訪問 nums 的元素時，若 `target - nums[i]` 的值在 map 中有出現表示找到答案，即為 `map[target - nums[i]]` 和 `i`，若沒出現則將 `{nums[i]], i}` 插入 map。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string getPermutation(int n, int k) {
        string result = "";
        string numbers = "123456789";

        vector<int> factorial(n, 1);
        for (int i = 2; i < n; ++i) {
            factorial[i] = i * factorial[i - 1];
        }

        --k; // for index
        for (int i = n; i >= 1; --i) {
            int j = k / factorial[i - 1];
            k %= factorial[i - 1];
            result += numbers[j];
            numbers.erase(j, 1);
        }

        return result;
    }
};
```

# Leetcode-15. 3Sum
## 題目說明
給定整數陣列`nums`，傳回所有三元組`[nums[i], nums[j], nums[k]]`，使得`i != j`, `i != k`, 和 `j != k`，且使得`nums[i ] + nums[j] + nums[k] == 0`。

請注意，解決方案集不得包含重複的三元組。

### 限制條件：
- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`
## 解題思路
首先對輸入的整數向量進行排序，以方便後續的處理。然後，初始化了一個空的集合 s 來存儲已經找到的三元組，以及一個空的結果向量 result 來存儲最終的結果。

接著，使用兩個指針 i 和 j 分別從左向右遍歷整數向量 nums。對於每個 i，初始化另外兩個指針 j 和 k，j 指向 i 的下一個位置，而 k 指向整數向量的最後一個位置。然後，在一個內部的迴圈中，對 j 和 k 指針進行迭代，計算三元組的總和 sum。如果 sum 等於目標值 target，則將找到的三元組添加到結果向量 result 中，並將這個三元組添加到集合 s 中，以避免重複。如果 sum 小於目標值 target，則增加 j，否則減少 k。如此一來，會不斷地縮小搜索範圍，直到找到所有符合條件的三元組為止。

最後，返回結果向量 result，其中包含所有符合條件的唯一三元組。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int target = 0;
        sort(nums.begin(), nums.end());
        set<vector<int>> s;
        vector<vector<int>> result;
        for (int i = 0; i < nums.size(); i++) {
            int j = i + 1;
            int k = nums.size() - 1;
            while (j < k) {
                {
                    int sum = nums[i] + nums[j] + nums[k];
                    if (sum == target) {
                        // 構造一個三元組
                        vector<int> triplet = {nums[i], nums[j], nums[k]};
                        // 將三元組添加到集合中，檢查是否重複
                        if (s.find(triplet) == s.end()) {
                            result.push_back(triplet);
                            s.insert(triplet);
                        }
                        j++;
                        k--;
                    } else if (sum < target) {
                        j++;
                    } else {
                        k--;
                    }
                }
            }
        }
        return result;
    }
};
```
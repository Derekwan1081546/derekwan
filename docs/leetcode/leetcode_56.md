
# Leetcode-56. Merge Intervals
## 題目說明
給定一個區間數組，其中 `intervals[i] = [starti, endi]`，合併所有重疊區間，並傳回覆蓋輸入中所有區間的非重疊區間數組。

### 限制條件：
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti  <= endi  <= 10^4`

## 解題思路
首先對區間進行排序，接著初始化目前的區間為第一個區，然後遍歷每個區間，檢查是否可以和目前正在處理的區間合併。如果可以合併，更新終點；如果不可以，則將目前區間加入結果中並更新目前區間為下一個區間。最後一步是將最後處理的區間加入到答案中。如此一來就可以正確地合併所有重疊的區間了。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        vector<vector<int>> ans;
        // 先對區間按照起始位置排序
        sort(intervals.begin(), intervals.end());

        // 初始化目前的區間為第一個區間
        vector<int> currentInterval = intervals[0];

        for (int i = 1; i < intervals.size(); i++) {
            // 如果目前區間的終點大於等於下一個區間的起點，進行合併
            if (currentInterval[1] >= intervals[i][0]) {
                currentInterval[1] = max(currentInterval[1], intervals[i][1]);
            } else {
                // 如果無法合併，則將目前區間加入答案中，並更新目前區間為下一個區間
                ans.push_back(currentInterval);
                currentInterval = intervals[i];
            }
        }

        // 添加最後一個區間
        ans.push_back(currentInterval);
        return ans;
    }
};
```
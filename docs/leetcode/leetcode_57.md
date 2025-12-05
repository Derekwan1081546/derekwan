
# Leetcode-57. Insert Interval
## 題目說明
給定一個不重疊區間數組 `intervals`，其中 `intervals[i] = [starti, endi]` 表示第 `i` 個區間的起始點和結束點，且 `intervals` 按 `starti` 升冪排列。同時給定一個區間 `newInterval = [start, end]`，表示另一個區間的起始點和結束點。

將 `newInterval` 插入 `intervals` 中，使得 `intervals` 仍然按 `starti` 升序排列，並且 `intervals` 中仍然沒有重疊的區間（如有必要，合併重疊的區間）。

返回插入後的 `intervals`。

注意，您無需直接修改 `intervals`。您可以建立一個新的陣列並傳回它。

### 限制條件：
- `0 <= intervals.length <= 10＾4`。
- `intervals[i].length == 2`。
- `0 <= starti <= endi <= 10＾5`。
- `intervals` 按 `starti` 升冪排序。
- `newInterval.length == 2`。
- `0 <= start <= end <= 10＾5`。

## 解題思路
1. 先將新區間加入 `interval` 清單中
題目要把 `newInterval` 插入到既有區間，最簡單的方式就是直接先把它放進 `intervals`。

2. 對所有區間依起始位置排序
插入後的區間可能沒有按照開始時間排列，因此先排序。
排序後才能線性地檢查是否重疊，避免複雜邏輯。

3. 開始遍歷區間並進行合併
使用 `ans` 保存合併後的結果，先放入第一個區間作為初始。

4. 每個區間依序比較是否與結果中的最後一個區間重疊：

    - 若重疊（當`前一區間的結束 >= 當前區間的開始`）

        → 將兩者合併：
        - 更新結束時間為較大的那個

    - 若不重疊

        → 直接把區間加入結果清單

5. 最後 `ans` 就是完整合併後的區間列表

總結
    `把新區間加入後，排序所有區間，再用線性掃描把重疊區間合併。`

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals,
                               vector<int>& newInterval) {
        intervals.push_back(newInterval);
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> ans;
        ans.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); i++) {
            if (ans.back()[1] >= intervals[i][0]) {
                ans.back()[1] = max(ans.back()[1], intervals[i][1]);
            } else {
                ans.push_back(intervals[i]);
            }
        }

        return ans;
    }
};
```
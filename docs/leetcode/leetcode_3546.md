
# Leetcode-3546. Equal Sum Grid Partition I
## 題目說明
給定一個 m × n 的正整數矩陣。你的任務是判斷是否可以對這個矩陣進行一次水平或垂直切割，使得：

切割後得到的兩個區域均非空。

兩個區域中元素的總和相等，或者可以透過最多排除一個單元格（從任一區域中排除）來使之相等。

如果排除一個單元格，則該區域的其餘部分必須保持連接。

如果存在這樣的分割，則傳回 true；否則傳回 false。

注意：如果一個區域內的每個單元格都可以透過向上、向下、向左或向右移動穿過該區域內的其他單元格到達，則該區域是連通的。

### 限制條件：
- `1 <= nums.length <= 50`
- `-1000 <= nums[i] <= 1000`

## 解題思路
這題的核心是判斷是否可以對矩陣做一次水平或垂直切割，讓切割後的兩個非空區域的元素總和相等。

首先計算整個矩陣的總和 `total_sum`。如果 `total_sum` 是奇數，就不可能分成相等的兩部分，直接返回 `false`。如果是偶數，則目標和為 `target = total_sum / 2`。

接著分別計算每一行的總和 `row_sums` 和每一列的總和 `col_sums`。這樣可以快速檢查所有可能的水平切割和垂直切割，而不必每次重新累加整個區域。

對於水平切割，實際上是在某一行之後切一刀，將上方若干整行作為一個區域。只要對 `row_sums` 做前綴和，檢查是否存在 `r` 使得 `row_sums[0] + row_sums[1] + ... + row_sums[r] == target`，就表示在第 `r` 行之後切割可以得到相等總和的兩個區域。

同理，對於垂直切割，是在某一列之後切一刀，將左側若干整列作為一個區域。只要對 `col_sums` 做前綴和，檢查是否存在 `c` 使得 `col_sums[0] + col_sums[1] + ... + col_sums[c] == target`，就代表可行。

如果任何一種切割方式可以達成 `target`，就返回 `true`；否則返回 `false`。

這種方法的重點在於：
- 先求出整體總和並判斷奇偶性
- 再用行總和與列總和的前綴和來檢查所有合法切割位置
- 每一種切割只需 O(m) 或 O(n) 的遍歷，不需要逐個模擬區域

- 時間複雜度：O(m * n) 來計算總和與行列總和，後續前綴和檢查各自再花 O(m) 或 O(n)，整體仍為 O(m * n)。
- 空間複雜度：O(m + n)，用於儲存每一行與每一列的總和。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool canPartitionGrid(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        long long total_sum = 0;
        vector<long long> row_sums(m, 0); // 儲存每一行的總和
        vector<long long> col_sums(n, 0); // 儲存每一列的總和

        // 一次性計算：總和、各行總和、各列總和
        // 時間複雜度：O(m * n)
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int val = grid[i][j];
                total_sum += val;
                row_sums[i] += val;
                col_sums[j] += val;
            }
        }

        // 提早結束：如果總和是奇數，絕對不可能平分
        if (total_sum % 2 != 0)
            return false;
        long long target = total_sum / 2;

        // 檢查水平切分
        long long current_sum = 0;
        for (int r = 0; r < m - 1; r++) { // 在第 r 行之後切一刀
            current_sum += row_sums[r];
            if (current_sum == target)
                return true;
        }

        // 檢查垂直切分
        current_sum = 0;
        for (int c = 0; c < n - 1; c++) { // 在第 c 列之後切一刀
            current_sum += col_sums[c];
            if (current_sum == target)
                return true;
        }

        return false;
    }
};
```

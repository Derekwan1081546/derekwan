
# Leetcode-200. Number of Islands
## 題目說明
給定一個 `m × n` 的二維二進位網格，其中「1」代表陸地，「0」代表水域，返回網格中島嶼的數量。

島嶼被水域環繞，由水平或垂直方向連接相鄰的陸地形成。您可以假設網格的四個邊緣都被水域環繞。

### 限制條件：
- `m == grid.length`。

- `n == grid[i].length`。

- `1 <= m, n <= 300`。

- `grid[i][j]` 為 `'0'` 或 `'1'`。


## 解題思路

這題是經典的 **圖論搜索 (Graph Traversal)** 問題，目標是計算二維網格中「島嶼」的數量。
這裡使用了 **深度優先搜尋 (DFS)** 的策略，核心概念可以想像成 **「沉沒島嶼 (Sinking Islands)」**。



我們可以將過程拆解為以下步驟：

1.  **遍歷網格 (Scan Grid)**：
    * 使用雙層迴圈遍歷每一個格子點 `(i, j)`。
    * 如果遇到 `'0'` (水)，則跳過。

2.  **發現島嶼 (Found an Island)**：
    * 當遇到 `'1'` (陸地) 時，代表我們發現了一個 **新的** 島嶼。
    * 將 `islandCount` 加 1。
    * **關鍵步驟**：立即啟動 `dfs` 函式，將這個島嶼 **完全銷毀**（標記為 `'0'`）。

3.  **DFS 遞迴銷毀 (Sink the Island)**：
    * 從當前座標 `(r, c)` 開始，先檢查邊界條件：
        * 如果超出網格範圍，或者當前位置已經是水 `'0'`，則停止遞迴 (`return`)。
    * **標記訪問**：將 `grid[r][c]` 修改為 `'0'`。這一步至關重要，它保證了同一個島嶼的陸地不會被外層迴圈重複計算。
    * **擴散**：向 **上、下、左、右** 四個方向遞迴調用 `dfs`，直到整塊相連的陸地都被變成水。

---

### 複雜度分析

假設網格的大小為 $M \times N$：

* **時間複雜度：$O(M \times N)$**
    * 雖然有雙層迴圈加上遞迴，但實際上每個格子 **最多只會被訪問兩次**：
        1.  外層迴圈遍歷時訪問一次。
        2.  DFS 遞迴過程中被標記為 `'0'` 時訪問一次（變成 `'0'` 後就不會再被處理）。
    * 因此整體時間是線性的。

* **空間複雜度：$O(M \times N)$**
    * 最壞情況下（整個網格都是陸地），DFS 的遞迴深度可能達到 $M \times N$（例如蛇形排列的島嶼），這會佔用系統堆疊空間。

## 參考解法
```cpp title="C++ " showLineNumbers
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty())
            return 0;

        int m = grid.size();
        int n = grid[0].size();
        int islandCount = 0;

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                // 當遇到陸地 '1'
                if (grid[i][j] == '1') {
                    islandCount++;   // 發現新島嶼
                    dfs(grid, i, j); // 把這整塊島嶼淹沒
                }
            }
        }
        return islandCount;
    }

private:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int m = grid.size();
        int n = grid[0].size();

        // 邊界檢查：超出範圍或是遇到水 '0' 就停止
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == '0') {
            return;
        }

        // 把當前陸地標記為 '0'，避免無限遞迴或重複計算
        grid[r][c] = '0';

        // 往上下左右四個方向繼續探索
        dfs(grid, r - 1, c); // 上
        dfs(grid, r + 1, c); // 下
        dfs(grid, r, c - 1); // 左
        dfs(grid, r, c + 1); // 右
    }
};
```
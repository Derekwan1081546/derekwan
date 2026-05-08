# Leetcode-874. Walking Robot Simulation
## 題目說明
一個機器人在無限大的 XY 平面上從 `(0, 0)` 出發，初始面朝**北方**。機器人接收一個整數陣列 `commands`，代表一系列需要執行的指令，指令只有三種：

- `-2`：向左轉 90 度。
- `-1`：向右轉 90 度。
- `1 <= k <= 9`：向前移動 `k` 個單位，每次移動一格。

網格上有一些障礙物，第 `i` 個障礙物位於 `obstacles[i] = (xi, yi)`。如果機器人撞到障礙物，它會停在障礙物前一格，然後繼續執行下一條指令。

回傳機器人在路徑中任意時刻所達到的**最大歐幾里得距離的平方**（例如距離為 5，則回傳 25）。

**注意**：
- `(0, 0)` 處可能有障礙物，機器人會忽略它直到離開原點，但之後將無法回到 `(0, 0)`。
- 北 = +Y，東 = +X，南 = -Y，西 = -X。

### 限制條件：
- `1 <= commands.length <= 10^4`。
- `commands[i]` 為 `-2`、`-1` 或 `[1, 9]` 範圍內的整數。
- `0 <= obstacles.length <= 10^4`。
- `-3 * 10^4 <= xi, yi <= 3 * 10^4`。
- 答案保證小於 `2^31`。

## 解題思路

本題使用**方向陣列 + 集合查詢**進行模擬。

### 演算法步驟

1. **建立障礙物集合**：
   將所有障礙物座標存入 `set<pair<int, int>>`，以便 $O(\log N)$ 快速查詢某座標是否為障礙物。

2. **定義方向陣列**：
   使用 `dx[4]` 和 `dy[4]` 分別代表北、東、南、西四個方向的位移量。`dir` 變數記錄當前方向索引（0 = 北）。

3. **處理指令**：
   - **右轉 (`-1`)**：`dir = (dir + 1) % 4`，順時針切換方向。
   - **左轉 (`-2`)**：`dir = (dir + 3) % 4`，等價於逆時針轉 90 度。
   - **前進 (`k` 步)**：逐步移動，每一步先計算下一格座標，若該座標不是障礙物則前進並更新最大距離平方；若是障礙物則 `break` 停止該指令的剩餘步數。

4. **回傳結果**：
   整個過程中持續追蹤 `x² + y²` 的最大值，最終回傳。

---

### 複雜度分析

* **時間複雜度：$O(C \cdot K + N \log N)$**
  其中 $C$ 為指令數量，$K$ 為每條前進指令的最大步數（至多 9），$N$ 為障礙物數量。建立障礙物集合 $O(N \log N)$，每步移動查詢集合 $O(\log N)$。

* **空間複雜度：$O(N)$**
  用於儲存障礙物集合。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int robotSim(vector<int>& commands, vector<vector<int>>& obstacles) {
        set<pair<int, int>> obstacleSet;
        int dx[4] = {0, 1, 0, -1};
        int dy[4] = {1, 0, -1, 0};
        int x = 0;
        int y = 0;
        int dir = 0; // 初始化 0 代表北方 (對應 dx[0], dy[0])
        int maxDist = 0;
        for (int i = 0; i < obstacles.size(); i++) {
            obstacleSet.insert({obstacles[i][0], obstacles[i][1]});
        }
        for (int cmd : commands) {
            if (cmd == -1) { // 右轉
                dir = (dir + 1) % 4;
            } else if (cmd == -2) { // 左轉
                dir = (dir + 3) % 4;
            } else { // 前進 k 步
                for (int i = 0; i < cmd; i++) {
                    // 計算下一步座標
                    int nextX = x + dx[dir];
                    int nextY = y + dy[dir];

                    // 檢查有沒有撞到障礙物
                    if (obstacleSet.find({nextX, nextY}) == obstacleSet.end()) {
                        x = nextX;
                        y = nextY;
                        // 更新最高紀錄
                        maxDist = max(maxDist, x * x + y * y);
                    } else {
                        // 撞到了，這筆指令剩下的步數都不走了
                        break;
                    }
                }
            }
        }
        return maxDist;
    }
};
```
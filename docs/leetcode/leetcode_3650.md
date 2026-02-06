
# Leetcode-3650. Minimum Cost Path with Edge Reversals
## 題目說明
給定一個有向加權圖，包含 `n` 個節點，節點編號從 `0` 到 `n - 1`，以及一個邊數組 `edges`，其中 `edges[i] = [ui, vi, wi]` 表示從節點 `ui` 到節點 `vi` 的有向邊，邊的成本為 `wi`。

每個節點 `ui` 都有一個開關，該開關最多只能使用一次：當到達 `ui` 且尚未使用該開關時，可以啟動其入邊 `vi → ui` 上的開關，然後將該邊反轉為 `ui → vi` 並立即遍歷該邊。

反轉操作僅對目前移動有效，使用反轉後的邊的成本為 `2 * wi`。

傳回從節點 `0` 到節點 `n - 1` 的最小總成本。如果不存在最小總成本，則傳回 `-1`。

### 限制條件：
- `2 <= n <= 5 * 10^4`。
- `1 <= edges.length <= 10^5`。
- `edges[i] = [ui, vi, wi]`。
- `0 <= ui, vi <= n - 1`。
- `1 <= wi <= 1000`。

## 解題思路

這道題目是標準的「單源最短路徑」問題。由於邊的權重皆為非負數，因此採用 **Dijkstra 演算法（戴克斯特拉演算法）** 是最合適的解法。

1.  **圖的預處理 (Graph Construction)**：
    首先將輸入的邊列表轉換為 **鄰接表 (Adjacency List)**。需要特別注意程式碼中的特殊邏輯：圖被視為有向圖，從點 $u$ 到 $v$ 的權重為 $w$，但反向從 $v$ 到 $u$ 的權重則被設定為 $2w$。這樣的結構能讓我們快速查找任何節點的相鄰邊。

2.  **核心演算法 (Core Algorithm)**：
    演算法的運作依賴於一個 **最小優先佇列 (Min-Priority Queue)** 和一個記錄從起點到各點最短距離的陣列。
    * **初始化**：將起點放入佇列，並將起點距離設為 0。
    * **貪婪選擇**：每次從佇列中取出目前累積成本最小的節點。
    * **終點判斷**：如果取出的節點就是終點，則直接回傳當前成本作為答案（因為貪婪策略保證了這是最短路徑）。
    * **過期檢查**：如果取出的路徑成本比我們已知的還大，代表這是過時的資訊，直接跳過。

3.  **鬆弛操作 (Relaxation)**：
    遍歷當前節點的所有鄰居，計算經由當前節點到達鄰居的新成本。如果新成本比鄰居原本記錄的距離更短，就更新鄰居的最短距離，並將這個新的路徑推入優先佇列中。

---

### 複雜度分析

* **時間複雜度：$O(E \log V)$**
    其中 $E$ 是邊的數量，$V$ 是節點的數量。這是因為在最壞的情況下，我們需要遍歷所有的邊，而每次更新路徑時，對優先佇列進行推入 (`push`) 或取出 (`pop`) 操作的時間成本為對數級別 ($\log V$)。

* **空間複雜度：$O(V + E)$**
    主要消耗在於儲存整張圖的鄰接表（包含所有點 $V$ 和邊 $E$），以及距離陣列 (`dist`) 和優先佇列 (`pq`) 所需的空間。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
    typedef pair<int, int> pii;

public:
    int minCost(int n, vector<vector<int>>& edges) {
        // Step 0: 建立鄰接表 (Adjacency List)
        // 這樣不用每次都掃描所有邊，大幅提升效率
        // graph[u] 存放 {鄰居 v, 權重 w}
        vector<vector<pair<int, int>>> graph(n);
        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            graph[u].push_back({v, w});
            graph[v].push_back({u, 2 * w}); // 無向圖，兩邊都要加
        }

        // Step 1: 初始化距離表
        vector<int> dist(n, INT_MAX);

        // Step 2: 建立 Min-Priority Queue
        priority_queue<pii, vector<pii>, greater<pii>> pq;

        // 設定起點 (從 0 開始，距離為 0)
        dist[0] = 0;
        pq.push({0, 0}); // {距離, 節點}

        while (!pq.empty()) {
            int d = pq.top().first;
            int u = pq.top().second;
            pq.pop();

            // 如果取出的點是終點，直接回傳答案
            if (u == n - 1)
                return d;

            // 過期資訊檢查 (Lazy Deletion)
            if (d > dist[u])
                continue;

            // Step 3: 遍歷鄰居 (只看與 u 相連的邊)
            for (auto& neighbor : graph[u]) {
                int v = neighbor.first;  // 鄰居節點
                int w = neighbor.second; // 邊的權重

                // 鬆弛操作：修正了原本莫名其妙的 2*weight
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }

        // 如果無法到達終點 (視題目要求回傳 -1 或其他值)
        return (dist[n - 1] == INT_MAX) ? -1 : dist[n - 1];
    }
};
```

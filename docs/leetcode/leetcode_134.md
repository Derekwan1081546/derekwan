
# Leetcode-134. Gas Station
## 題目說明
一條環形路線上有 `n` 個加油站，第 `i` 個加油站的加油量為 `gas[i]`。

您有一輛油箱無限的汽車，從第 `i` 個車站到下一個 `(i + 1)` 個車站需要花費 `cost[i]` 的汽油。您在一個加油站帶著空油箱開始旅程。

給定兩個整數數組 `gas` 和 `cost` ，如果你可以順時針方向繞一圈，則返回起始加油站的索引，否則返回 `-1` 。如果存在解，則保證它是唯一的。



範例1：

- 輸入：`gas = [1,2,3,4,5]`，`cost = [3,4,5,1,2]`
- 輸出：`3`

解釋：
從 3 號站（索引 3）開始並加滿 4 單位氣體。你的汽車 = 0 + 4 = 4
前往車站 4。
前往車站 0。
前往車站 1。
前往車站 2。
前往車站 3。
因此，返回 3 作為起始索引。

範例2：

- 輸入：`gas = [2,3,4]`，`cost = [3,4,3]`
- 輸出：`-1`

解釋：
您無法從 0 號站或 1 號站出發，因為沒有足夠的汽油前往下一站。
我們從 2 號加油站開始，加滿 4 個單位的汽油。你的汽車 = 0 + 4 = 4
前往車站 0。
前往車站 1。
您無法返回 2 號站，因為它需要 4 個單位的汽油，但您只有 3 個單位。
因此，無論從哪裡開始，都無法繞一圈。
### 限制條件：
- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`

## 解題思路
遍歷所有加油站：我們計算每個加油站的剩餘油量 `（tank）`，即 `tank += gas[i] - cost[i]` 。如果在某個加油站時， `tank` 變為負數，則意味著從當前加油站開始無法繞回，因此需要從下一個加油站重新開始（更新起始加油站 `start = i + 1`）。

總油量判斷：在遍歷的同時，我們累積總油量 `total_gas` 和總成本 `total_cost`，如果 `total_gas < total_cost`，說明無法繞一圈，直接返回 `-1`。

最終結果：若總油量大於等於總成本，則返回上次能繞圈的加油站 `start`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total_gas = 0, total_cost = 0, tank = 0, start = 0;

        for (int i = 0; i < gas.size(); i++) {
            total_gas += gas[i];
            total_cost += cost[i];
            tank += gas[i] - cost[i];

            // 如果當前油量不夠，從下一個加油站重新開始
            if (tank < 0) {
                start = i + 1;
                tank = 0; // 重置油箱
            }
        }

        // 總油量如果小於總消耗量，無法完成環繞，返回 -1
        if (total_gas < total_cost) {
            return -1;
        }

        return start;
    }
};
```
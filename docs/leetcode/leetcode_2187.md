---
sidebar_position: 7
---
# Leetcode-2187
## 題目說明
給定一個陣列時間，其中 `time[i]` 表示第 `i` 輛巴士完成一次行程所需的時間。

每輛公車可連續多次行駛； 即完成本次行程後即可立即開始下一次行程。 此外，每輛公車都是獨立運作的； 也就是說，一輛公車的行程不會影響任何其他公車的行程。

您還會獲得一個整數 `totalTrips` ，它表示所有公共汽車總共應進行的行程次數。 返回所有公車至少完成 `totalTrips` 行程所需的最短時間。
### 限制條件：
- `1 <= time.length <= 10^5`
- `1 <= time[i], totalTrips <= 10^7`
## 解題思路
利用二元搜尋法(Binary Search):這是尋找單調函數下給定界限的最小整數的經典問題。
我們可以對完成行程所需的時間進行二分搜索，並檢查是否能夠在給定的時間內完成totalTrips。 該解決方案有兩個組成部分：
- `Binary Search`查找最少的時間
- 檢查是否可以在給定時間內完成`totalTrips`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    long long minimumTime(vector<int>& time, int totalTrips) {
        long long start = 0;
        long long end = 1e14;
        //Binary Search
        while (start <= end) {
            long trip = 0;
            long long mid = start + (end - start) / 2;
            for (int i = 0; i < time.size(); i++)
                trip += mid / time[i];
            if (trip < totalTrips)
                start = mid + 1;
            else
                end = mid - 1;
        }
        return start;
    }
};
```
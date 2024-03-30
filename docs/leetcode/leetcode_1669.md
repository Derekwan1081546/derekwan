
# Leetcode-1669. Merge In Between Linked Lists
## 題目說明
給定兩個`linked lists`：`list1` 和 `list2`，大小分別為 n 和 m。
將`list1`的節點從第a個節點刪除到第b個節點，並將`list2`放在它們的位置。
### 限制條件：
- `3 <= list1.length <= 104`
- `1 <= a <= b < list1.length - 1`
- `1 <= list2.length <= 104`
## 解題思路
首先宣告一個`ptr`指標指向`list1`的頭，接著將`ptr`指向第`a-1`個node，接著再宣告一個`ptr2`指向`ptr->next`，跑迴圈將`ptr2`指向最後一個node，再來將`ptr->next`先指向`list2`的頭，最後把`list2`指向最後一個node再連接`ptr2`，如此一來就完成了連接兩個`linked lists`了。
## 參考解法
```cpp title="C++" showLineNumbers
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode* ptr = list1;
        for (int i = 0; i < a - 1; i++) {
            ptr = ptr->next;
        }
        ListNode* ptr2 = ptr->next;
        for (int i = 0; i < b - a + 1; i++) {
            ptr2 = ptr2->next;
        }
        ptr->next = list2;
        while (list2->next) {
            list2 = list2->next;
        }
        list2->next = ptr2;
        return list1;
    }
};
```
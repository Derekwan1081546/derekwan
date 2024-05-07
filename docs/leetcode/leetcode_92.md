
# Leetcode-92. Reverse Linked List II
## 題目說明
給定一單鍊錶(`singly linked list`)的頭和左右兩個整數（其中 `left <= right`），將列表的節點從左位置反轉到右位置，並返回反轉後的列表。
### 限制條件：
- 列表中的節點數為 `n`。
- `1 <= n <= 500`
- `-500 <= Node.val <= 500`
- `1 <= left <= right <= n`

## 解題思路
使用了一個虛擬頭節點 `dummy`，這可以簡化一些特殊情況，如反轉包括頭節點時的處理。
通過兩個指針 `prev` 和 `then`，在不需要額外空間的情況下進行節點反轉。
最終返回 `dummy->next`，這是因為虛擬頭節點的下一個節點現在是更新後的真正的頭節點。
## 參考解法
```cpp title="C++ " showLineNumbers
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
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (head == nullptr)
            return head;

        ListNode* dummy = new ListNode(0); // 使用虛擬頭節點方便處理邊界條件
        dummy->next = head;
        ListNode* prev = dummy;

        // 移動 prev 到反轉開始前一個節點
        for (int i = 0; i < left - 1; i++) {
            prev = prev->next;
        }

        ListNode* start = prev->next; // 反轉開始的節點
        ListNode* then = start->next; // 要反轉的節點

        // 開始反轉節點
        for (int i = 0; i < right - left; i++) {
            start->next = then->next;//將 start 的下一個節點更新為 then 的下一個節點。
            then->next = prev->next;//把 then 節點移動到反轉區段的開頭。
            prev->next = then;//更新 prev 的下一個節點為 then，完成節點的插入。
            then = start->next;//將 then 更新為下一個將要移動的節點。
        }

        return dummy->next;//最後返回虛擬頭節點的下一個節點，即是原鏈表經過部分反轉後的新頭節點。
    }
};
```
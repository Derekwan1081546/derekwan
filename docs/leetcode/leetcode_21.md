
# Leetcode-21. Merge Two Sorted Lists
## 題目說明
給定兩個已排序鍊錶(`linked list`) `list1` 和 `list2` 的頭。

將兩個list合併為一個排序鍊錶。 這個list應該透過將前兩個list的節點拼接在一起來形成。

傳回合併鍊錶的頭。
### 限制條件：
- 兩個list中的節點數均在 `[0, 50]` 範圍內。
- `-100 <= Node.val <= 100`
- `list1` 和 `list2` 均依非降序排序。
## 解題思路
使用遞迴的方法來解決:

在合併鍊錶上維護一個頭指標和一個尾指標。

然後透過比較兩個鍊錶的第一個節點來選擇合併鍊錶的頭。

對於兩個清單中的所有後續節點，您選擇較小的目前節點並將其連結到合併清單的尾部，並將該清單的目前指標向前移動一步。

當兩個清單中還有一些剩餘元素時，您繼續執行此操作。

如果僅一個清單中仍有一些元素，則將此剩餘清單連結到合併清單的尾部。

最初，合併的鍊錶為NULL。

比較前兩個節點的值，將值較小的節點作為合併鍊錶的頭節點。

由於它是合併清單中的第一個也是唯一一個節點，因此它也將是尾部。

然後將 head1 向前移動一步。

時間複雜度 O(n+m)
空間複雜度 O(n+m) 這是由於遞歸而產生的輔助堆疊空間。

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
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (l1 == NULL) {
            return l2;
        }
        if (l2 == NULL) {
            return l1;
        }
        // 如果 l1 的值小於等於 l2 的值，則將 l1 的下一個節點指向遞調用
        // mergeTwoLists(l1->next, l2)，並返回 l1
        if (l1->val <= l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        }
        // 如果 l1 的值大於 l2 的值，則將 l2 的下一個節點指向遞迴調用
        //mergeTwoLists(l1, l2->next)，並返回 l2
        else {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }
};
```
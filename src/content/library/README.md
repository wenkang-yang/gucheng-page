# 如何添加藏卷

`Library` 是网站里的「藏卷」栏目，用来记录读过的书籍、教材和论文。

## 1. 放入 PDF

把有权公开分享的 PDF 放进：

```text
public/library/
```

文件名建议使用小写英文、数字和连字符，例如：

```text
public/library/introduction-to-algorithms.pdf
```

## 2. 登记条目

编辑本文件夹中的 `data.json`：

```json
[
  {
    "id": "introduction-to-algorithms",
    "title": "Introduction to Algorithms",
    "creator": "Thomas H. Cormen 等",
    "kind": "textbook",
    "year": 2022,
    "description": "算法课程使用的教材。",
    "file": "/library/introduction-to-algorithms.pdf",
    "sourceUrl": "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
    "readDate": "2026-08-07",
    "tags": ["算法", "计算机科学"]
  }
]
```

其中 `id`、`title` 和 `kind` 为必填字段；`creator`、`year`、`description`、`file`、`sourceUrl`、`readDate` 和 `tags` 都可以省略。

`kind` 只能填写以下三种值：

- `book`：书籍
- `textbook`：教材
- `paper`：论文

页面固定按照“书籍 → 教材 → 论文”分组，同一分组内按标题排序。因此，调整 `data.json` 中的先后顺序不会改变页面上的展示顺序。

不方便公开电子版时，可以只登记书目信息，或使用 `sourceUrl` 链接到出版社、论文主页等官方来源。

请勿公开上传仍受版权保护且没有传播授权的电子书或教材。PDF 较大时也建议先压缩，避免仓库和部署体积增长过快。

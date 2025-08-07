// --- Tiptap Node ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-node/quote-node/quote-node.scss";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

const TestPage = async () => {
  // const res = await getBoardList();

  // const html = res.at(-1)?.content || "";
  // const html = res[0].content || "";

  // return <CustomHtml html={html} />;

  return <div>test</div>;
};

export default TestPage;

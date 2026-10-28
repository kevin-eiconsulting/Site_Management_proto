import os
import zipfile
import html

# Helper functions to build WordprocessingML elements

def escape(text):
    return html.escape(str(text))

class DocxBuilder:
    def __init__(self):
        self.paragraphs = []
        
    def add_title(self, title, subtitle=None):
        xml = f"""
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Title"/>
                <w:spacing w:before="360" w:after="120"/>
                <w:jc w:val="left"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:b/>
                    <w:color w:val="0F172A"/>
                    <w:sz w:val="56"/>
                </w:rPr>
                <w:t>{escape(title)}</w:t>
            </w:r>
        </w:p>
        """
        self.paragraphs.append(xml)
        
        if subtitle:
            xml_sub = f"""
            <w:p>
                <w:pPr>
                    <w:spacing w:before="0" w:after="360"/>
                    <w:jc w:val="left"/>
                </w:pPr>
                <w:r>
                    <w:rPr>
                        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                        <w:color w:val="475569"/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>{escape(subtitle)}</w:t>
                </w:r>
            </w:p>
            """
            self.paragraphs.append(xml_sub)

    def add_heading_1(self, text):
        xml = f"""
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Heading1"/>
                <w:spacing w:before="400" w:after="140"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:b/>
                    <w:color w:val="1E40AF"/>
                    <w:sz w:val="34"/>
                </w:rPr>
                <w:t>{escape(text)}</w:t>
            </w:r>
        </w:p>
        """
        self.paragraphs.append(xml)

    def add_heading_2(self, text):
        xml = f"""
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Heading2"/>
                <w:spacing w:before="300" w:after="100"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:b/>
                    <w:color w:val="2563EB"/>
                    <w:sz w:val="26"/>
                </w:rPr>
                <w:t>{escape(text)}</w:t>
            </w:r>
        </w:p>
        """
        self.paragraphs.append(xml)

    def add_heading_3(self, text):
        xml = f"""
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Heading3"/>
                <w:spacing w:before="200" w:after="80"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:b/>
                    <w:color w:val="334155"/>
                    <w:sz w:val="22"/>
                </w:rPr>
                <w:t>{escape(text)}</w:t>
            </w:r>
        </w:p>
        """
        self.paragraphs.append(xml)

    def add_paragraph(self, text, bold_prefix=None, italic=False, color="334155"):
        runs_xml = ""
        if bold_prefix:
            runs_xml += f"""
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:b/>
                    <w:color w:val="{color}"/>
                    <w:sz w:val="22"/>
                </w:rPr>
                <w:t xml:space="preserve">{escape(bold_prefix)} </w:t>
            </w:r>
            """
        runs_xml += f"""
        <w:r>
            <w:rPr>
                <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                {"<w:i/>" if italic else ""}
                <w:color w:val="{color}"/>
                <w:sz w:val="22"/>
            </w:rPr>
            <w:t>{escape(text)}</w:t>
        </w:r>
        """
        xml = f"""
        <w:p>
            <w:pPr>
                <w:spacing w:before="60" w:after="120" w:line="276" w:lineRule="auto"/>
            </w:pPr>
            {runs_xml}
        </w:p>
        """
        self.paragraphs.append(xml)

    def add_bullet(self, text, bold_prefix=None, level=0):
        left_indent = 360 + (level * 360)
        runs_xml = ""
        if bold_prefix:
            runs_xml += f"""
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:b/>
                    <w:color w:val="1E293B"/>
                    <w:sz w:val="22"/>
                </w:rPr>
                <w:t xml:space="preserve">{escape(bold_prefix)} </w:t>
            </w:r>
            """
        runs_xml += f"""
        <w:r>
            <w:rPr>
                <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                <w:color w:val="334155"/>
                <w:sz w:val="22"/>
            </w:rPr>
            <w:t>{escape(text)}</w:t>
        </w:r>
        """
        xml = f"""
        <w:p>
            <w:pPr>
                <w:pStyle w:val="ListParagraph"/>
                <w:spacing w:before="40" w:after="80"/>
                <w:ind w:left="{left_indent}" w:hanging="240"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:color w:val="2563EB"/>
                    <w:b/>
                    <w:sz w:val="22"/>
                </w:rPr>
                <w:t xml:space="preserve">▪  </w:t>
            </w:r>
            {runs_xml}
        </w:p>
        """
        self.paragraphs.append(xml)

    def add_callout(self, title, content, bg_color="EFF6FF", border_color="3B82F6"):
        xml = f"""
        <w:tbl>
            <w:tblPr>
                <w:tblW w:w="9360" w:type="dxa"/>
                <w:tblBorders>
                    <w:top w:val="none"/>
                    <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>
                    <w:bottom w:val="none"/>
                    <w:right w:val="none"/>
                </w:tblBorders>
                <w:tblCellMar>
                    <w:top w:w="160" w:type="dxa"/>
                    <w:left w:w="240" w:type="dxa"/>
                    <w:bottom w:w="160" w:type="dxa"/>
                    <w:right w:w="240" w:type="dxa"/>
                </w:tblCellMar>
            </w:tblPr>
            <w:tr>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="9360" w:type="dxa"/>
                        <w:shd w:val="clear" w:color="auto" w:fill="{bg_color}"/>
                    </w:tcPr>
                    <w:p>
                        <w:pPr>
                            <w:spacing w:before="40" w:after="60"/>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                                <w:b/>
                                <w:color w:val="1E40AF"/>
                                <w:sz w:val="22"/>
                            </w:rPr>
                            <w:t>{escape(title)}</w:t>
                        </w:r>
                    </w:p>
                    <w:p>
                        <w:pPr>
                            <w:spacing w:before="40" w:after="40" w:line="276" w:lineRule="auto"/>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                                <w:color w:val="1E293B"/>
                                <w:sz w:val="21"/>
                            </w:rPr>
                            <w:t>{escape(content)}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
            </w:tr>
        </w:tbl>
        <w:p><w:pPr><w:spacing w:before="0" w:after="160"/></w:pPr></w:p>
        """
        self.paragraphs.append(xml)

    def add_table(self, headers, rows, col_widths=None):
        num_cols = len(headers)
        if not col_widths:
            total_w = 9360
            each_w = total_w // num_cols
            col_widths = [each_w] * num_cols

        # Header XML
        hdr_cells_xml = ""
        for i, h in enumerate(headers):
            w = col_widths[i]
            hdr_cells_xml += f"""
            <w:tc>
                <w:tcPr>
                    <w:tcW w:w="{w}" w:type="dxa"/>
                    <w:shd w:val="clear" w:color="auto" w:fill="1E3A8A"/>
                    <w:tcMar>
                        <w:top w:w="120" w:type="dxa"/>
                        <w:left w:w="140" w:type="dxa"/>
                        <w:bottom w:w="120" w:type="dxa"/>
                        <w:right w:w="140" w:type="dxa"/>
                    </w:tcMar>
                </w:tcPr>
                <w:p>
                    <w:pPr>
                        <w:spacing w:before="40" w:after="40"/>
                    </w:pPr>
                    <w:r>
                        <w:rPr>
                            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                            <w:b/>
                            <w:color w:val="FFFFFF"/>
                            <w:sz w:val="20"/>
                        </w:rPr>
                        <w:t>{escape(h)}</w:t>
                    </w:r>
                </w:p>
            </w:tc>
            """

        rows_xml = f"<w:tr>{hdr_cells_xml}</w:tr>"

        # Data Rows
        for r_idx, row in enumerate(rows):
            bg = "F8FAFC" if (r_idx % 2 == 1) else "FFFFFF"
            cells_xml = ""
            for i, cell_val in enumerate(row):
                w = col_widths[i]
                cells_xml += f"""
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="{w}" w:type="dxa"/>
                        <w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>
                        <w:tcMar>
                            <w:top w:w="100" w:type="dxa"/>
                            <w:left w:w="140" w:type="dxa"/>
                            <w:bottom w:w="100" w:type="dxa"/>
                            <w:right w:w="140" w:type="dxa"/>
                        </w:tcMar>
                    </w:tcPr>
                    <w:p>
                        <w:pPr>
                            <w:spacing w:before="30" w:after="30"/>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                                <w:color w:val="334155"/>
                                <w:sz w:val="20"/>
                            </w:rPr>
                            <w:t>{escape(cell_val)}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                """
            rows_xml += f"<w:tr>{cells_xml}</w:tr>"

        xml = f"""
        <w:tbl>
            <w:tblPr>
                <w:tblW w:w="9360" w:type="dxa"/>
                <w:tblBorders>
                    <w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
                    <w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
                    <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
                    <w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
                    <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
                    <w:insideV w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
                </w:tblBorders>
            </w:tblPr>
            {rows_xml}
        </w:tbl>
        <w:p><w:pPr><w:spacing w:before="0" w:after="160"/></w:pPr></w:p>
        """
        self.paragraphs.append(xml)

    def add_page_break(self):
        xml = """
        <w:p>
            <w:r>
                <w:br w:type="page"/>
            </w:r>
        </w:p>
        """
        self.paragraphs.append(xml)

    def build_docx(self, output_path):
        content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
</Types>"""

        root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

        doc_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>
</Relationships>"""

        settings = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:zoom w:percent="100"/>
</w:settings>"""

        font_table = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:fonts xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:font w:name="Calibri"><w:family w:val="swiss"/></w:font>
  <w:font w:name="Calibri Light"><w:family w:val="swiss"/></w:font>
  <w:font w:name="Consolas"><w:family w:val="modern"/></w:font>
</w:fonts>"""

        styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/>
        <w:sz w:val="22"/>
        <w:color w:val="334155"/>
        <w:lang w:val="en-US"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="34"/>
      <w:color w:val="1E40AF"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="26"/>
      <w:color w:val="2563EB"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="22"/>
      <w:color w:val="334155"/>
    </w:rPr>
  </w:style>
</w:styles>"""

        body_content = "\n".join(self.paragraphs)

        # A4 page with standard 1 inch margins (1440 dxa = 1 in, width 12240 dxa, height 15840 dxa)
        document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {body_content}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
      <w:cols w:space="720"/>
    </w:sectPr>
  </w:body>
</w:document>"""

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as docx:
            docx.writestr('[Content_Types].xml', content_types)
            docx.writestr('_rels/.rels', root_rels)
            docx.writestr('word/_rels/document.xml.rels', doc_rels)
            docx.writestr('word/settings.xml', settings)
            docx.writestr('word/fontTable.xml', font_table)
            docx.writestr('word/styles.xml', styles)
            docx.writestr('word/document.xml', document_xml)

print("DocxBuilder class defined.")

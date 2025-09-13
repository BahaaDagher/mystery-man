import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export const exportQuestionnaireToWord = (questionnaire) => {
  if (!questionnaire) {
    console.error('No questionnaire data provided for export');
    return;
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: questionnaire.title || 'Questionnaire',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }), // Empty line
          
          // Generate content for each step
          ...questionnaire.steps.flatMap((step, stepIndex) => {
            const stepContent = [
              // Step title
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${stepIndex + 1}. ${step.name}`,
                    bold: true,
                    size: 28,
                  }),
                ],
                spacing: { before: 400, after: 200 },
              }),
              
              // Questions for this step
              ...step.questions.flatMap((question, questionIndex) => {
                const paragraphs = [];
                
                // Question title - ALL types get numbered
                
                paragraphs.push(
                new Paragraph({
                    children: [
                    new TextRun({
                        text: `${stepIndex + 1}.${questionIndex + 1} ${question.title}`,
                        bold: false,
                        size: 22,
                    }),
                    ],
                    spacing: { before: 100, after: 100 },
                })
                );
                
                
                // Question type and options (no underlines for open questions)
                 if (question.type === 'headLine') {
                  paragraphs.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          bold: true,
                          size: 24,
                        }),
                      ],
                    })
                  );
                }
                else if (question.type === 'yesOrNo') {
                  paragraphs.push(
                    new Paragraph({
                      text: '☐ Yes    ☐ No',
                      spacing: { after: 100 },
                    })
                  );
                } else if ((question.type === 'SingleChoice'|| question.type === 'multiChoice') && question.options?.length > 0) {
                  question.options.forEach((option) => {
                    paragraphs.push(
                      new Paragraph({
                        text: `☐ ${option.title}`,
                        spacing: { after: 50 },
                      })
                    );
                  });
                } else if (question.type === 'rating') {
                  paragraphs.push(
                    new Paragraph({
                      text: 'تقييم: ⭐ ⭐ ⭐ ⭐ ⭐',
                      spacing: { after: 100 },
                    })
                  );
                } else if (question.type === 'open') {
                  // No underlines for open questions anymore
                  paragraphs.push(
                    new Paragraph({
                      text: '',
                      spacing: { after: 100 },
                    })
                  );
                } else if (question.type === 'uploadImages') {
                  paragraphs.push(
                    new Paragraph({
                      text: '[تحميل صورة]',
                      spacing: { after: 100 },
                    })
                  );
                }
                
                paragraphs.push(new Paragraph({ text: '' })); // Empty line after each question
                return paragraphs;
              }),
            ];
            
            // Add separator lines between steps (except for the last step)
            if (stepIndex < questionnaire.steps.length - 1) {
              stepContent.push(
                // new Paragraph({ text: '' }), // Empty line before separator
                new Paragraph({
                  text: '_'.repeat(60),
                  spacing: { before: 200, after: 100 },
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  text: '_'.repeat(60),
                  spacing: { after: 700 },
                  alignment: AlignmentType.CENTER,
                })
              );
            }
            
            return stepContent;
          }),
        ],
      },
    ],
  });

  // Generate and download the document
  Packer.toBlob(doc).then((blob) => {
    const fileName = `${questionnaire.title || 'Questionnaire'}_${new Date().toISOString().split('T')[0]}.docx`;
    saveAs(blob, fileName);
  }).catch((error) => {
    console.error('Error generating Word document:', error);
  });
};
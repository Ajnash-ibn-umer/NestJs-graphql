import { FieldNode } from 'graphql';

export default function getProjection(
  fieldNode: FieldNode,
): Record<string, any> {
  const projection: Record<string, any> = {};
  if (fieldNode.selectionSet) {
    fieldNode.selectionSet.selections.forEach((selection) => {
      if (selection.kind === 'Field' && selection.name.value !== '__typename') {
        if (
          !selection.selectionSet ||
          selection.selectionSet?.selections.length === 0
        ) {
          return (projection[selection.name.value] = 1);
        } else {
          return (projection[selection.name.value] = {
            ...getProjection(selection),
          });
        }
      }
    });
  }
  return projection;
}

export const responseFormat = (valueObject: Object) => {
  let projects = {};
  const returnObj = Object.keys(valueObject).forEach((key) => {
    projects[key] = 1;
  });
  return { $project: projects };
};

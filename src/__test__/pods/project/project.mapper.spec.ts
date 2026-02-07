import * as projectApiModel from "#pods/project/api/project.api-model"
import { mapProjectFromApiToVm } from "#pods/project/project.mapper";
import { mockProject } from "#pods/project/api/project.mock-data";
import * as viewModel from "#pods/project/project.vm";
describe("Project Mapper test", () => {
  //  beforeEach(() => {
  //   vi.clearAllMocks();
  // });
  it("should return default project when no projects are provided", () => {
    // Arrange
    const project: projectApiModel.Project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(
    {
      id: "",
      name: "",
      externalId: "",
      comments: "",
      isActive: false,
      employees: []
    });
  });

  it("should return a valid project when a valid API project is provided", () => {
    // Arrange
    const apiProject: projectApiModel.Project = mockProject;

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(viewModel.createEmptyProject).not.toHaveBeenCalled();
    expect(result).toEqual({
      id: apiProject.id,
      name: apiProject.name,
      externalId: apiProject.externalId,
      comments: apiProject.comments,
      isActive: apiProject.isActive,
      employees: apiProject.employees
    });
  });
});

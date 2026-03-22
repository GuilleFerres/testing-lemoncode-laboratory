import * as projectApiModel from "#pods/project/api/project.api-model";
import * as employeeApiModel from "#pods/employee-list/api/employee-list.api-model";
import { mapProjectFromApiToVm, mapEmployeeSummaryFromApiToVm, mapEmployeeSummaryListFromApiToVm } from "#pods/project/project.mapper";
import { mockProject } from "#pods/project/api/project.mock-data";
import * as viewModel from "#pods/project/project.vm";
import { mockEmployeeList } from "#pods/employee-list/api/employee-list.mock-data";
import { mapEmployeeListFromApiToVm } from "#pods/employee-list/employee-list.mappers";


const mockEmployeeSummary: projectApiModel.EmployeeSummary = {
  id: "1",
  employeeName: "Daniel Perez",
  isAssigned: true,
};

const mockEmployeeSummaryWithoutIsAssigned: projectApiModel.EmployeeSummary = {
  id: "1",
  employeeName: "Daniel Perez",
};

describe("Employee Summary Mapper test", () => {
  it("should return a valid employee summary when a valid API employee summary is provided", () => {
    // Arrange
    const apiEmployeeSummary: projectApiModel.EmployeeSummary = mockEmployeeSummary;

    // Act
    const result = mapEmployeeSummaryFromApiToVm(apiEmployeeSummary);

    // Assert
    expect(result).toEqual(apiEmployeeSummary);
    expect(result).not.toBe(apiEmployeeSummary);
  });

  it("should return a valid employee summary when isAssigned is not provided", () => {
    // Arrange
    const apiEmployeeSummary: projectApiModel.EmployeeSummary = mockEmployeeSummaryWithoutIsAssigned;

    // Act
    const result = mapEmployeeSummaryFromApiToVm(apiEmployeeSummary);

    // Assert
    expect(result).toEqual(apiEmployeeSummary);
    expect(result).not.toBe(apiEmployeeSummary);
  });
});

describe("Employee Summary List Mapper test", () => {
  it("should return a valid employee summary list when a valid API employee summary list is provided", () => {
    // Arrange
    const apiEmployeeList: employeeApiModel.Employee[] = mockEmployeeList;

    // Act
    const result = mapEmployeeListFromApiToVm(apiEmployeeList);

    // Assert
    expect(result).toEqual(apiEmployeeList);
    expect(result).not.toBe(apiEmployeeList);
  });
});

describe("Project Employee Summary List Mapper test", () => {
  it("should map each employee summary using mapEmployeeSummaryFromApiToVm", () => {
    // Arrange
    const apiEmployeeSummaries: projectApiModel.EmployeeSummary[] = [
      mockEmployeeSummary,
      { ...mockEmployeeSummaryWithoutIsAssigned, id: "2" },
    ];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(apiEmployeeSummaries);

    // Assert
    expect(result).toEqual(apiEmployeeSummaries);
    expect(result).not.toBe(apiEmployeeSummaries);
  });

  it("should return an empty array when input list is empty", () => {
    // Arrange
    const apiEmployeeSummaries: projectApiModel.EmployeeSummary[] = [];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(apiEmployeeSummaries);

    // Assert
    expect(result).toEqual([]);
    expect(result).not.toBe(apiEmployeeSummaries);
  });
});

describe("Project Mapper test", () => {
  beforeEach(() => {
    vi.spyOn(viewModel, "createEmptyProject");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return default project when no projects are provided", () => {
    // Arrange
    const project: projectApiModel.Project | undefined = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(viewModel.createEmptyProject).toHaveBeenCalled();
    expect(result).toEqual({
      id: "",
      name: "",
      externalId: "",
      comments: "",
      isActive: false,
      employees: [],
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
      employees: apiProject.employees,
    });
    expect(result.employees).not.toBe(apiProject.employees);
  });
});

// describe("Project Mapper test", () => {
//   beforeEach(() => {
//     vi.spyOn(viewModel, 'createEmptyProject')
//   });
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });
//   it("should return default project when no projects are provided", () => {
//     // Arrange
//     const project: projectApiModel.Project | undefined = undefined;

//     // Act
//     const result = mapProjectFromApiToVm(project);

//     // Assert
//     expect(viewModel.createEmptyProject).toHaveBeenCalled();
//     expect(result).toEqual({
//       id: "",
//       name: "",
//       externalId: "",
//       comments: "",
//       isActive: false,
//       employees: [],
//     });
//   });

//   it("should return a valid project when a valid API project is provided", () => {
//     // Arrange
//     const apiProject: projectApiModel.Project = mockProject;

//     // Act
//     const result = mapProjectFromApiToVm(apiProject);

//     // Assert
//     expect(viewModel.createEmptyProject).not.toHaveBeenCalled();
//     expect(result).toEqual({
//       id: apiProject.id,
//       name: apiProject.name,
//       externalId: apiProject.externalId,
//       comments: apiProject.comments,
//       isActive: apiProject.isActive,
//       employees: apiProject.employees,
//     });
//     expect(result.employees).not.toBe(apiProject.employees);
//   });
// });
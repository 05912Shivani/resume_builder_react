import formDataReducer, {
    updateFormData,
    setActiveTab,
    savePersonalInfo,
    saveWorkExperience,
    saveEducation,
    saveKeySkills,
    saveProjects,
    setTemplateId,
    resetFormData,
  } from './formDataSlice';
  
  describe('formDataSlice Reducer', () => {
    let initialState;
  
    beforeEach(() => {
      initialState = {
        personalInfo: [],
        workExperience: [],
        education: [],
        keySkills: [],
        projects: [],
        activeTab: 0,
        templateId: 1,
      };
    });
  
    test('should return the initial state', () => {
      expect(formDataReducer(undefined, {})).toEqual(initialState);
    });
  
    test('should update form data correctly', () => {
      const newState = formDataReducer(initialState, updateFormData({ field: 'personalInfo', data: [{ name: 'John Doe' }] }));
      expect(newState.personalInfo).toEqual([{ name: 'John Doe' }]);
    });
  
    test('should set active tab', () => {
      const newState = formDataReducer(initialState, setActiveTab(2));
      expect(newState.activeTab).toBe(2);
    });
  
    test('should save personal info', () => {
      const newState = formDataReducer(initialState, savePersonalInfo([{ name: 'Alice' }]));
      expect(newState.personalInfo).toEqual([{ name: 'Alice' }]);
    });
  
    test('should save work experience', () => {
      const newState = formDataReducer(initialState, saveWorkExperience([{ company: 'Google' }]));
      expect(newState.workExperience).toEqual([{ company: 'Google' }]);
    });
  
    test('should save education', () => {
      const newState = formDataReducer(initialState, saveEducation([{ degree: 'BSc' }]));
      expect(newState.education).toEqual([{ degree: 'BSc' }]);
    });
  
    test('should save key skills', () => {
      const newState = formDataReducer(initialState, saveKeySkills(['React', 'Redux']));
      expect(newState.keySkills).toEqual(['React', 'Redux']);
    });
  
    test('should save projects', () => {
      const newState = formDataReducer(initialState, saveProjects([{ title: 'Portfolio' }]));
      expect(newState.projects).toEqual([{ title: 'Portfolio' }]);
    });
  
    test('should set template ID', () => {
      const newState = formDataReducer(initialState, setTemplateId(3));
      expect(newState.templateId).toBe(3);
    });
  
    test('should reset form data to initial state', () => {
      const modifiedState = {
        personalInfo: [{ name: 'Bob' }],
        workExperience: [{ company: 'Amazon' }],
        education: [{ degree: 'MSc' }],
        keySkills: ['Node.js'],
        projects: [{ title: 'E-commerce' }],
        activeTab: 4,
        templateId: 5,
      };
  
      const resetState = formDataReducer(modifiedState, resetFormData());
      expect(resetState).toEqual(initialState);
    });
  });
  
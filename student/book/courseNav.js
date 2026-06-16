function renderCourseNav(elm, courseNavModel) {
    let selectedModule = 0;
    let selectedLesson = 0;
    courseNavModel.modules.forEach((m, i)=>{
        m.lessons.forEach((l, j)=>{
            if (l.selected){
                [selectedModule, selectedLesson] =[i,j]
            }
        })
    })
    const currentURL = new URL(window.location.href);

    elm.classList.add("course-nav");

    function render() {
        const currentModule = courseNavModel.modules[selectedModule];
        const currentLesson = currentModule.lessons[selectedLesson];

        elm.innerHTML = `
            <div class="course-nav-container">

                <div class="nav-row">

                    <!-- MODULE SELECTOR -->
                    <div class="nav-group">
                        <button class="nav-btn module-btn active">
                            <span class="nav-title">
                                ${currentModule.title}
                            </span>
                            <span class="chevron module-chevron">&#9656;</span>
                        </button>

                        <div class="dropdown module-dropdown">
                            ${courseNavModel.modules.map((m, i) => `
                                <div class="dropdown-item ${
                                    i === selectedModule ? "selected" : ""
                                }" data-module="${i}">
                                    ${m.title}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <span class="separator">&gt;</span>

                    <!-- LESSON SELECTOR -->
                    <div class="nav-group">
                        <button class="nav-btn lesson-btn active">
                            <span class="nav-title">
                                ${currentLesson.title}
                            </span>
                            <span class="chevron lesson-chevron">&#9656;</span>
                        </button>

                        <div class="dropdown lesson-dropdown">
                            ${currentModule.lessons.map((lesson, i) => `
                                <div class="dropdown-item ${
                                    i === selectedLesson ? "selected" : ""
                                }"
                                data-lesson="${i}">
                                    ${lesson.title}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                </div>

            </div>
        `;

        bindEvents();
    }

    function bindEvents() {
        const moduleBtn = elm.querySelector(".module-btn");
        const lessonBtn = elm.querySelector(".lesson-btn");

        const moduleDropdown = elm.querySelector(".module-dropdown");
        const lessonDropdown = elm.querySelector(".lesson-dropdown");

        const moduleChevron = elm.querySelector(".module-chevron");
        const lessonChevron = elm.querySelector(".lesson-chevron");

        moduleBtn.onclick = (e) => {
            e.stopPropagation();

            moduleDropdown.classList.toggle("open");
            moduleChevron.classList.toggle("rotate");

            lessonDropdown.classList.remove("open");
            lessonChevron.classList.remove("rotate");
        };

        lessonBtn.onclick = (e) => {
            e.stopPropagation();

            lessonDropdown.classList.toggle("open");
            lessonChevron.classList.toggle("rotate");

            moduleDropdown.classList.remove("open");
            moduleChevron.classList.remove("rotate");
        };

        elm.querySelectorAll("[data-module]").forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation();

                selectedModule = Number(item.dataset.module);
                selectedLesson = 0;
                currentURL.searchParams.set("lessonIndex",selectedLesson )
                currentURL.searchParams.set("moduleIndex", selectedModule )
                render();
                window.location.assign(currentURL.toString());

            };
        });

        elm.querySelectorAll("[data-lesson]").forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation();

                selectedLesson = Number(item.dataset.lesson);
				currentURL.searchParams.set("lessonIndex",selectedLesson )
                render();
                window.location.assign(currentURL.toString());

            };
        });

        document.onclick = () => {
            moduleDropdown.classList.remove("open");
            lessonDropdown.classList.remove("open");

            moduleChevron.classList.remove("rotate");
            lessonChevron.classList.remove("rotate");
        };
    }

    render();

    return {
        getSelection() {
            return {
                moduleIndex: selectedModule,
                lessonIndex: selectedLesson,
                module: courseNavModel.modules[selectedModule],
                lesson: courseNavModel.modules[selectedModule]
                    .lessons[selectedLesson]
            };
        }
    };
}
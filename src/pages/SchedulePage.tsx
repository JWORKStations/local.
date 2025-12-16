export function SchedulePage() {
  // Sample trainers data
  const trainers = [
    { id: 1, name: '강사윤', avatar: '👨' },
    { id: 2, name: '금비', avatar: '👩' },
    { id: 3, name: '로이', avatar: '👨' },
    { id: 4, name: '리키', avatar: '👩' },
    { id: 5, name: '세나', avatar: '👨' },
    { id: 6, name: '송예빛나', avatar: '👩' },
    { id: 7, name: '수', avatar: '👨' },
    { id: 8, name: '사이', avatar: '👩' },
    { id: 9, name: '예지', avatar: '👨' },
    { id: 10, name: '오유오...', avatar: '👩' },
    { id: 11, name: '유나', avatar: '👨' },
    { id: 12, name: '이든', avatar: '👩' },
    { id: 13, name: '제니', avatar: '👨' },
    { id: 14, name: '제이슨', avatar: '👩' },
    { id: 15, name: '케이', avatar: '👨' },
    { id: 16, name: '현진', avatar: '👩' }
  ];

  // Time slots from 00:00 to 23:00
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, '0');
    return `${hour}:00`;
  });

  // Sample appointments data
  const appointments = [
    { id: 1, trainerId: 1, startTime: '00:40', endTime: '01:30', title: '이라움', color: 'gray' },
    { id: 2, trainerId: 7, startTime: '06:30', endTime: '07:30', title: '이에리', color: 'pink' },
    { id: 3, trainerId: 7, startTime: '07:30', endTime: '08:30', title: '김슬기', subtitle: '필라PT', color: 'blue' },
    { id: 4, trainerId: 7, startTime: '09:00', endTime: '10:00', title: '유유유', subtitle: '필라PT', color: 'blue' },
    { id: 5, trainerId: 7, startTime: '09:30', endTime: '10:30', title: '박유정', subtitle: '필라PT', color: 'blue' },
    { id: 6, trainerId: 15, startTime: '06:30', endTime: '07:30', title: '김슬기', subtitle: '레슨', color: 'blue' }
  ];

  return (
    <div className="schedule-page">
      {/* Header */}
      <div className="schedule-header">
        <div className="schedule-header-left">
          {/* View Mode Tabs */}
          <div className="view-mode-tabs">
            <button className="view-mode-tab active">일별</button>
            <button className="view-mode-tab">주별</button>
            <button className="view-mode-tab">월별</button>
            <button className="view-mode-tab today">오늘</button>
          </div>
        </div>

        <div className="schedule-header-center">
          {/* Date Navigation */}
          <button className="date-nav-btn">
            <span>←</span>
          </button>
          <div className="current-date">
            <span className="date-text">2025.12.01 월요일</span>
          </div>
          <button className="date-nav-btn">
            <span>→</span>
          </button>
        </div>

        <div className="schedule-header-right">
          <button className="btn-new-schedule">
            <span className="btn-icon">+</span>
            <span>신규 일정 등록</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="schedule-filters">
        <div className="filters-left">
          <select className="filter-select">
            <option>수업 유형</option>
            <option>GX</option>
            <option>PT</option>
            <option>필라테스</option>
          </select>

          <select className="filter-select">
            <option>강사 이름</option>
            {trainers.map(trainer => (
              <option key={trainer.id}>{trainer.name}</option>
            ))}
          </select>
        </div>

        <div className="filters-right">
          <button className="view-toggle active">
            <span className="icon">⊞</span>
          </button>
          <button className="view-toggle">
            <span className="icon">☰</span>
          </button>

          <span className="view-label">주중 보기</span>
          <span className="view-label">조회 시간</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="schedule-calendar">
        <div className="calendar-container">
          {/* Time Column */}
          <div className="time-column">
            <div className="time-header"></div>
            {timeSlots.map((time) => (
              <div key={time} className="time-slot">
                <span className="time-label">{time}</span>
              </div>
            ))}
          </div>

          {/* Trainers Grid */}
          <div className="trainers-grid">
            {/* Trainers Header */}
            <div className="trainers-header">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="trainer-header-cell">
                  <div className="trainer-info">
                    <span className="trainer-avatar">{trainer.avatar}</span>
                    <span className="trainer-name">{trainer.name}</span>
                  </div>
                  <div className="trainer-date">
                    <span className="date-day">그룹 10개/{trainer.id * 2}개</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="time-grid">
              {timeSlots.map((time) => (
                <div key={time} className="time-row">
                  {trainers.map((trainer) => (
                    <div key={`${time}-${trainer.id}`} className="grid-cell">
                      {/* Appointments will be positioned absolutely */}
                    </div>
                  ))}
                </div>
              ))}

              {/* Appointments Overlay */}
              <div className="appointments-overlay">
                {appointments.map((apt) => {
                  const trainer = trainers.find(t => t.id === apt.trainerId);
                  if (!trainer) return null;

                  const trainerIndex = trainers.indexOf(trainer);
                  const [startHour, startMinute] = apt.startTime.split(':').map(Number);
                  const [endHour, endMinute] = apt.endTime.split(':').map(Number);
                  
                  const startPosition = startHour * 60 + startMinute;
                  const endPosition = endHour * 60 + endMinute;
                  const duration = endPosition - startPosition;

                  const cellHeight = 60; // 60px per hour
                  const top = (startPosition / 60) * cellHeight;
                  const height = (duration / 60) * cellHeight;

                  const trainerCellWidth = 100 / trainers.length;
                  const left = trainerIndex * trainerCellWidth;

                  return (
                    <div
                      key={apt.id}
                      className={`appointment-block appointment-${apt.color}`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        left: `${left}%`,
                        width: `${trainerCellWidth}%`
                      }}
                    >
                      <div className="appointment-content">
                        <div className="appointment-time">
                          {apt.startTime} - {apt.endTime}
                        </div>
                        <div className="appointment-title">{apt.title}</div>
                        {apt.subtitle && (
                          <div className="appointment-subtitle">{apt.subtitle}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

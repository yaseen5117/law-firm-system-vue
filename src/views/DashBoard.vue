<template>
  <main id="main">
    <!-- ======= Services Section ======= -->
    <section
      id="services"
      style="margin-top: 100px"
      class="services section-bg"
    >
      <div class="container" v-if="!this.user">
        <p class="text-danger text-center">Authenticating...</p>
      </div>
      <div class="container" v-if="this.user">
        <div class="row gy-4">
          <div
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('petitions-calendar') }
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="100"
          >
            <div class="icon-box iconbox-blue border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"
                  ></path>
                </svg>
                <i class="bx bx-calendar"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('petitions-calendar') }
                  "
                  >Court Calendar</a
                >
              </h4>
              <p>
                Mark dates of hearing. Review tomorrow's cases. Get hearing
                alerts.
              </p>
            </div>
          </div>

          <div
            @click="gotoLink('petitions')"
            v-if="this.user"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-orange border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="bx bx-file"></i>
              </div>
              <h4><router-link to="petitions">Case Files</router-link></h4>
              <p>
                View all your Case Files online. Keep records updated. And
                upload new ones.
              </p>
            </div>
          </div>

          <!-- <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('opinions') }
            "
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
          >
            <div class="icon-box iconbox-pink border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,541.5067337569781C382.14930387511276,545.0595476570109,479.8736841581634,548.3450877840088,526.4010558755058,480.5488172755941C571.5218469581645,414.80211281144784,517.5187510058486,332.0715597781072,496.52539010469104,255.14436215662573C477.37192572678356,184.95920475031193,473.57363656557914,105.61284051026155,413.0603344069578,65.22779650032875C343.27470386102294,18.654635553484475,251.2091493199835,5.337323636656869,175.0934190732945,40.62881213300186C97.87086631185822,76.43348514350839,51.98124368387456,156.15599469081315,36.44837278890362,239.84606092416172C21.716077023791087,319.22268207091537,43.775223500013084,401.1760424656574,96.891909868211,461.97329694683043C147.22146801428983,519.5804099606455,223.5754009179313,538.201503339737,300,541.5067337569781"
                  ></path>
                </svg>
                <i class="bx bx-tachometer"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('opinions') }
                  "
                >
                  Opinions
                </a>
              </h4>
              <p>
                Contains all Details of Opinions. Click to Open all Details.
              </p>
            </div>
          </div> -->

          <div
            @click="gotoLink('contract-and-agreement')"
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="100"
          >
            <div class="icon-box iconbox-yellow border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,503.46388370962813C374.79870501325706,506.71871716319447,464.8034551963731,527.1746412648533,510.4981551193396,467.86667711651364C555.9287308511215,408.9015244558933,512.6030010748507,327.5744911775523,490.211057578863,256.5855673507754C471.097692560561,195.9906835881958,447.69079081568157,138.11976852964426,395.19560036434837,102.3242989838813C329.3053358748298,57.3949838291264,248.02791733380457,8.279543830951368,175.87071277845988,42.242879143198664C103.41431057327972,76.34704239035025,93.79494320519305,170.9812938413882,81.28167332365135,250.07896920659033C70.17666984294237,320.27484674793965,64.84698225790005,396.69656628748305,111.28512138212992,450.4950937839243C156.20124167950087,502.5303643271138,231.32542653798444,500.4755392045468,300,503.46388370962813"
                  ></path>
                </svg>
                <i class="fa fa-handshake-o"></i>
              </div>
              <h4>
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'contract-and-agreement',
                  }"
                >
                  Sample Contracts
                </router-link>
              </h4>
              <p>Library of draft contracts. You can also add your own!</p>
            </div>
          </div>

          <!-- pleading link -->
          <div
            @click="gotoLink('sample-pleading')"
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-redish border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>

                <i class="fa fa-tasks"></i>
              </div>
              <h4>
                <router-link to="sample-pleading">Sample Pleadings</router-link>
              </h4>
              <p>Library of draft pleadings. You can also add your own!</p>
            </div>
          </div>

          <div
            @click="gotoLink('petition-general-case-law')"
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-red border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,532.3542879108572C369.38199826031484,532.3153073249985,429.10787420159085,491.63046689027357,474.5244479745417,439.17860296908856C522.8885846962883,383.3225815378663,569.1668002868075,314.3205725914397,550.7432151929288,242.7694973846089C532.6665558377875,172.5657663291529,456.2379748765914,142.6223662098291,390.3689995646985,112.34683881706744C326.66090330228417,83.06452184765237,258.84405631176094,53.51806209861945,193.32584062364296,78.48882559362697C121.61183558270385,105.82097193414197,62.805066853699245,167.19869350419734,48.57481801355237,242.6138429142374C34.843463184063346,315.3850353017275,76.69343916112496,383.4422959591041,125.22947124332185,439.3748458443577C170.7312796277747,491.8107796887764,230.57421082200815,532.3932930995766,300,532.3542879108572"
                  ></path>
                </svg>
                <i class="fa fa-book"></i>
              </div>
              <h4>
                <router-link
                  :to="{
                    name: 'petition-general-case-law',
                  }"
                  >Frequently Asked Legal Questions</router-link
                >
              </h4>
              <p>Some frequently asked questions.</p>
            </div>
          </div>

          <div
            @click="gotoLink('#')"
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-secret border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,532.3542879108572C369.38199826031484,532.3153073249985,429.10787420159085,491.63046689027357,474.5244479745417,439.17860296908856C522.8885846962883,383.3225815378663,569.1668002868075,314.3205725914397,550.7432151929288,242.7694973846089C532.6665558377875,172.5657663291529,456.2379748765914,142.6223662098291,390.3689995646985,112.34683881706744C326.66090330228417,83.06452184765237,258.84405631176094,53.51806209861945,193.32584062364296,78.48882559362697C121.61183558270385,105.82097193414197,62.805066853699245,167.19869350419734,48.57481801355237,242.6138429142374C34.843463184063346,315.3850353017275,76.69343916112496,383.4422959591041,125.22947124332185,439.3748458443577C170.7312796277747,491.8107796887764,230.57421082200815,532.3932930995766,300,532.3542879108572"
                  ></path>
                </svg>
                <i class="fa fa-user-secret"></i>
              </div>
              <h4>
                <router-link to="#">Criminal Law Guru</router-link>
              </h4>
              <p>Fastest way to research Pakistani criminal law. Try it!</p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('limitation-calculator') }
            "
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-dark-red border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>

                <i class="fa fa-calculator"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('limitation-calculator') }
                  "
                >
                  Limitation Calculator
                </a>
              </h4>
              <p>
                Calculate the last date of filling for various categories of
                cases. A taste of the world of AI lawyering.
              </p>
            </div>
          </div>

          <div
            @click="gotoLink('#')"
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-secret border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,532.3542879108572C369.38199826031484,532.3153073249985,429.10787420159085,491.63046689027357,474.5244479745417,439.17860296908856C522.8885846962883,383.3225815378663,569.1668002868075,314.3205725914397,550.7432151929288,242.7694973846089C532.6665558377875,172.5657663291529,456.2379748765914,142.6223662098291,390.3689995646985,112.34683881706744C326.66090330228417,83.06452184765237,258.84405631176094,53.51806209861945,193.32584062364296,78.48882559362697C121.61183558270385,105.82097193414197,62.805066853699245,167.19869350419734,48.57481801355237,242.6138429142374C34.843463184063346,315.3850353017275,76.69343916112496,383.4422959591041,125.22947124332185,439.3748458443577C170.7312796277747,491.8107796887764,230.57421082200815,532.3932930995766,300,532.3542879108572"
                  ></path>
                </svg>
                <i class="fa fa-gavel"></i>
              </div>
              <h4>
                <router-link to="#"
                  >Corporate Law Guru (coming soon!)</router-link
                >
              </h4>
              <p>
                Step-by-step guide for getting corporate registrations, drafting
                corporate documents and archiving them.
              </p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('#transaction-calculator') }
            "
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-grey border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="fa fa-calculator"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('#transaction-calculator') }
                  "
                  >Transaction Calculator (coming soon!)</a
                >
              </h4>
              <p>
                Calculate the stamp duty and registration fee payable on various
                kinds of business transaction.
              </p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('#service-rules-library') }
            "
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-service-rules border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>

                <i class="fa fa-book"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('#service-rules-library') }
                  "
                  >Service Rules Library (coming soon!)</a
                >
              </h4>
              <p>An encyclopedia of service rules.</p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('invoices') }
            "
            v-if="this.user.is_admin || this.user.is_student"
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
          >
            <div class="icon-box iconbox-teal border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,566.797414625762C385.7384707136149,576.1784315230908,478.7894351017131,552.8928747891023,531.9192734346935,484.94944893311C584.6109503024035,417.5663521118492,582.489472248146,322.67544863468447,553.9536738515405,242.03673114598146C529.1557734026468,171.96086150256528,465.24506316201064,127.66468636344209,395.9583748389544,100.7403814666027C334.2173773831606,76.7482773500951,269.4350130405921,84.62216499799875,207.1952322260088,107.2889140133804C132.92018162631612,134.33871894543012,41.79353780512637,160.00259165414826,22.644507872594943,236.69541883565114C3.319112789854554,314.0945973066697,72.72355303640163,379.243833228382,124.04198916343866,440.3218312028393C172.9286146004772,498.5055451809895,224.45579914871206,558.5317968840102,300,566.797414625762"
                  ></path>
                </svg>
                <i class="fa fa-money"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('invoices') }
                  "
                  >Accounts</a
                >
              </h4>
              <p>Generate invoices and keep track of them.</p>
            </div>
          </div>

          <!-- <div
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="100"
          >
            <div
              v-on="
                this.user.is_student
                  ? { click: () => studentModal() }
                  : { click: () => gotoLink('online-meeting') }
              "
              class="icon-box iconbox-blue border cursor-pointer"
            >
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"
                  ></path>
                </svg>
                <i class="fa fa-users"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('online-meeting') }
                  "
                  >Video Call</a
                >
              </h4>
              <p>
                Contains all Details of Client Consultation. Click to Open all
                Details.
              </p>
            </div>
          </div> -->

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('links') }
            "
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-orange border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>

                <i class="fa fa-link"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('links') }
                  "
                  >Useful Links</a
                >
              </h4>
              <p>Some other handy Law and Tech tools available online</p>
            </div>
          </div>
          <!-- New Tabs Added -->

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('fir-sections') }
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            v-if="
              (this.user.is_admin ||
                this.user.is_lawyer ||
                this.user.is_student) &&
              this.user.company_id == 1
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box fir-section-box border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="fa fa-list-alt"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('fir-sections') }
                  "
                  >FIR Reader</a
                >
              </h4>
              <p>
                Contains all Details of FIR Reader. Click to Open all Details.
              </p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('fir-reader') }
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            v-if="
              (this.user.is_admin ||
                this.user.is_lawyer ||
                this.user.is_student) &&
              this.user.company_id == 1
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box fir-section-box border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="fa fa-book"></i>
              </div>
              <h4>
                <a
                  target="_blank"
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('fir-reader') }
                  "
                  >FIR Reader (Public View)</a
                >
              </h4>
              <p>
                Contains all Details of FIR Reader. Click to Open all Details.
              </p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : {
                    click: () =>
                      gotoExternelLink('https://www.worldagreements.com/'),
                  }
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            v-if="
              (this.user.is_admin ||
                this.user.is_lawyer ||
                this.user.is_student) &&
              this.user.company_id == 1
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box fir-section-box border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="fa fa-signature"></i>
              </div>
              <h4>
                <a
                  target="_blank"
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : {
                          click: () =>
                            gotoExternelLink(
                              'https://www.worldagreements.com/'
                            ),
                        }
                  "
                  >E-signature</a
                >
              </h4>
              <p>
                Sign all your contracts and other documents through our
                state-of-the-art e-signature module
              </p>
            </div>
          </div>

          <div
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : {
                    click: () =>
                      gotoExternelLink('https://www.lawgatgame.com/'),
                  }
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            v-if="
              (this.user.is_admin ||
                this.user.is_lawyer ||
                this.user.is_student) &&
              this.user.company_id == 1
            "
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box fir-section-box border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="fa fa-gamepad"></i>
              </div>
              <h4>
                <a
                  target="_blank"
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : {
                          click: () =>
                            gotoExternelLink('https://www.lawgatgame.com/'),
                        }
                  "
                  >Law Games</a
                >
              </h4>
              <p>
                Try out our law games, specifically curated by our professional
                lawyers in their relative fields
              </p>
            </div>
          </div>

          <div
            v-if="
              this.user.is_admin || this.user.is_lawyer || this.user.is_student
            "
            v-on="
              this.user.is_student
                ? { click: () => studentModal() }
                : { click: () => gotoLink('#') }
            "
            :class="this.user.is_student ? 'disabled-dashboard-menu' : ''"
            class="cursor-pointer col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos-delay="200"
          >
            <div class="icon-box iconbox-orange border">
              <div class="icon">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="none"
                    stroke-width="0"
                    fill="#f5f5f5"
                    d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                  ></path>
                </svg>
                <i class="bx bx-file"></i>
              </div>
              <h4>
                <a
                  v-on="
                    this.user.is_student
                      ? { click: () => studentModal() }
                      : { click: () => gotoLink('#') }
                  "
                  >Others</a
                >
              </h4>
              <p>
                Contains all Details of Others sections. Click to Open all
                Details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->
    <!-- End Services Section -->
  </main>
  <Dialog
    :dismissableMask="true"
    :modal="true"
    v-model:visible="displaymodal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '60vw' }"
  >
    <template #header>
      <h4><i class="fa fa-ban fa-2xl forbidden-icon" /> Forbidden</h4>
    </template>
    <div class="confirmation-content">
      <span class="forbidden-text"
        >This module is not available in the Student Version. Please contact us
        at {{ this.globalGeneralSetting.site_phone }} if you wish to
        access this module.</span
      >
    </div></Dialog
  >
  <!-- End #main -->
</template>

<script>
// @ is an alias to /src
//import CaseDetail from "./CaseDetail.vue";
import { mapState } from "vuex";

export default {
  name: "DashBoard",
  computed: mapState(["user", "globalGeneralSetting"]),
  data() {
    return {
      displaymodal: false,
    };
  },
  methods: {
    gotoLink(path) {
      if (path == "fir-reader") {
        let routeData = this.$router.resolve({
          name: "fir_reader",
        });
        window.open(routeData.href, "_blank");
      }
      this.$router.push({ path: path });
    },
    gotoExternelLink(link) {
      window.open(link, "_blank");
      //location.href = link;
    },
    studentModal() {
      this.displaymodal = true;
    },
  },
  mounted() {
    document.getElementById("header");
    document.title = "Dashboard";
  },
};
</script>

<style scoped>
.forbidden-icon {
  color: red;
}
.forbidden-text {
  font-size: 17px;
}
.disabled-dashboard-menu {
  opacity: 0.6;
  cursor: pointer;
}
</style>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _3D
{
    class Model
    {
        private double[,] points;
        public int CountPointsModel { get; set; }
        public int CountPointsCircle { get; set; }

        public Model(int n)
        {
            CountPointsModel = 8 + (n * 2);
            CountPointsCircle = n;
            points = new double[CountPointsModel, 3];
        }

        public double this[int i, int j]
        {
            get
            {
                return points[i, j];
            }
            set
            {
                points[i, j] = value;
            }
        }
    }

    public class ThreeDirection
    {
        private Model model;
        private Pen pen;
        private Brush br;
        private Color[] cl = { Color.Red, Color.Blue };
        private Font fn;
        private const int DX = 150;
        private const int DY = 450;
        private const int S = 20;

        public ThreeDirection()
        {
            br = new SolidBrush(cl[1]);
            fn = new Font("Times New Roman", 8);
        }

        public void ClearCanvas(Graphics gr)
        {
            gr.Clear(Color.White);
        }

        public void DrawSystem(Graphics gr, PictureBox pic)
        {
            gr.Clear(Color.White);
            pen = new Pen(Color.Black, 1);
            br = new SolidBrush(cl[1]);
            pen.EndCap = LineCap.ArrowAnchor;
            gr.DrawLine(pen, 0, Convert.ToInt32(pic.Height * 0.75), pic.Width - 3, Convert.ToInt32(pic.Height * 0.75));
            gr.DrawLine(pen, Convert.ToInt32(pic.Width * 0.25), pic.Height, Convert.ToInt32(pic.Width * 0.25), 0);
            pen = new Pen(Color.Black, 1);
            gr.DrawString("X", fn, br, pic.Width - 17, Convert.ToInt32(pic.Height * 0.75) - 17);
            gr.DrawString("Y", fn, br, Convert.ToInt32(pic.Width * 0.25) + 4, 0);
            for (int i = 1; i <= 21; i++)
            {
                gr.DrawLine(pen, Convert.ToInt32(pic.Width * 0.25) + (S * i), Convert.ToInt32(pic.Height * 0.75) - 5, Convert.ToInt32(pic.Width * 0.25) + (S * i), Convert.ToInt32(pic.Height * 0.75) + 5);
                gr.DrawString(i.ToString(), fn, br, Convert.ToInt32(pic.Width * 0.25) + (S * i) - 5, Convert.ToInt32(pic.Height * 0.75) + 7);
                //gr.DrawLine(pen, pic.Width / 2 - (20 * i), pic.Height / 2 - 5, pic.Width / 2 - (20 * i), pic.Height / 2 + 5);
                //gr.DrawString((-i).ToString(), fn, br, pic.Width / 2 - (20 * i) - 7, pic.Height / 2 + 7);
            }
            for (int i = 1; i <= 21; i++)
            {
                //gr.DrawLine(pen, pic.Width / 2 - 5, pic.Height / 2 + (20 * i), pic.Width / 2 + 6, pic.Height / 2 + (20 * i));
                //gr.DrawString((-i).ToString(), fn, br, pic.Width / 2 - 30, pic.Height / 2 + (20 * i) - 7);
                gr.DrawLine(pen, Convert.ToInt32(pic.Width * 0.25) - 5, Convert.ToInt32(pic.Height * 0.75) - (S * i), Convert.ToInt32(pic.Width * 0.25) + 6, Convert.ToInt32(pic.Height * 0.75) - (S * i));
                gr.DrawString(i.ToString(), fn, br, Convert.ToInt32(pic.Width * 0.25) - 25, Convert.ToInt32(pic.Height * 0.75) - (S * i) - 7);
            }
        }

        public void DrawModel(Graphics gr)
        {
            br = new SolidBrush(cl[0]);

            for (int i = 0; i < model.CountPointsModel; i++)
            {                
                gr.FillEllipse(br,Convert.ToInt32(model[i, 0]) - 3, Convert.ToInt32(model[i, 1]) - 3, 6, 6);
                gr.DrawString((i + 1).ToString(), fn, br, Convert.ToInt32(model[i, 0] - 8), Convert.ToInt32(model[i, 1] + 5));
            }

            pen = new Pen(Color.Green, 1);

            //1 грань
            gr.DrawLine(pen, Convert.ToInt32(model[0, 0]), Convert.ToInt32(model[0, 1]), Convert.ToInt32(model[1, 0]), Convert.ToInt32(model[1, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[1, 0]), Convert.ToInt32(model[1, 1]), Convert.ToInt32(model[2, 0]), Convert.ToInt32(model[2, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[2, 0]), Convert.ToInt32(model[2, 1]), Convert.ToInt32(model[3, 0]), Convert.ToInt32(model[3, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[0, 0]), Convert.ToInt32(model[0, 1]), Convert.ToInt32(model[3, 0]), Convert.ToInt32(model[3, 1]));

            //2 грань
            gr.DrawLine(pen, Convert.ToInt32(model[2, 0]), Convert.ToInt32(model[2, 1]), Convert.ToInt32(model[5, 0]), Convert.ToInt32(model[5, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[5, 0]), Convert.ToInt32(model[5, 1]), Convert.ToInt32(model[4, 0]), Convert.ToInt32(model[4, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[4, 0]), Convert.ToInt32(model[4, 1]), Convert.ToInt32(model[3, 0]), Convert.ToInt32(model[3, 1]));

            //3 грань
            gr.DrawLine(pen, Convert.ToInt32(model[5, 0]), Convert.ToInt32(model[5, 1]), Convert.ToInt32(model[6, 0]), Convert.ToInt32(model[6, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[6, 0]), Convert.ToInt32(model[6, 1]), Convert.ToInt32(model[7, 0]), Convert.ToInt32(model[7, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[4, 0]), Convert.ToInt32(model[4, 1]), Convert.ToInt32(model[7, 0]), Convert.ToInt32(model[7, 1]));

            //4 грань
            gr.DrawLine(pen, Convert.ToInt32(model[0, 0]), Convert.ToInt32(model[0, 1]), Convert.ToInt32(model[7, 0]), Convert.ToInt32(model[7, 1]));
            gr.DrawLine(pen, Convert.ToInt32(model[1, 0]), Convert.ToInt32(model[1, 1]), Convert.ToInt32(model[6, 0]), Convert.ToInt32(model[6, 1]));

            pen = new Pen(Color.Orange, 1);

            gr.DrawLine(pen, Convert.ToInt32(model[8, 0]), Convert.ToInt32(model[8, 1]), Convert.ToInt32(model[model.CountPointsModel - model.CountPointsCircle - 1, 0]), Convert.ToInt32(model[model.CountPointsModel - model.CountPointsCircle - 1, 1]));
            for (int i = 8; i < model.CountPointsModel - model.CountPointsCircle - 1; i++)
            {
                gr.DrawLine(pen, Convert.ToInt32(model[i, 0]), Convert.ToInt32(model[i, 1]), Convert.ToInt32(model[i + 1, 0]), Convert.ToInt32(model[i + 1, 1]));
            }

            gr.DrawLine(pen, Convert.ToInt32(model[model.CountPointsModel - model.CountPointsCircle, 0]), Convert.ToInt32(model[model.CountPointsModel - model.CountPointsCircle, 1]), Convert.ToInt32(model[model.CountPointsModel - 1, 0]), Convert.ToInt32(model[model.CountPointsModel - 1, 1]));
            for (int i = model.CountPointsModel - model.CountPointsCircle; i < model.CountPointsModel - 1; i++)
            {
                gr.DrawLine(pen, Convert.ToInt32(model[i, 0]), Convert.ToInt32(model[i, 1]), Convert.ToInt32(model[i + 1, 0]), Convert.ToInt32(model[i + 1, 1]));
            }

            for (int i = 8; i < model.CountPointsModel - model.CountPointsCircle; i++)
            {
                gr.DrawLine(pen, Convert.ToInt32(model[i, 0]), Convert.ToInt32(model[i, 1]), Convert.ToInt32(model[i + model.CountPointsCircle, 0]), Convert.ToInt32(model[i + model.CountPointsCircle, 1]));
            }
        }

        public void CoordinateCalculating(int A, int B, int C, int R, int dX, int dY, int n)
        {
            model = new Model(n);

            //1 точка
            model[0, 0] = DX;
            model[0, 1] = DY;
            model[0, 2] = 0;

            //2 точка
            model[1, 0] = DX;
            model[1, 1] = DY - (C * S);
            model[1, 2] = 0;

            //3 точка
            model[2, 0] = DX + (A * S);
            model[2, 1] = DY - (C * S);
            model[2, 2] = 0;

            //4 точка
            model[3, 0] = DX + (A * S);
            model[3, 1] = DY;
            model[3, 2] = 0;

            //5 точка
            model[4, 0] = DX + (A * S);
            model[4, 1] = DY;
            model[4, 2] = B * S;

            //6 точка
            model[5, 0] = DX + (A * S);
            model[5, 1] = DY - (C * S);
            model[5, 2] = B * S;

            //7 точка
            model[6, 0] = DX;
            model[6, 1] = DY - (C * S);
            model[6, 2] = B * S;

            //8 точка
            model[7, 0] = DX;
            model[7, 1] = DY;
            model[7, 2] = B * S;

            double inc = 360 / n, alpha, alpha2 = inc;

            for (int i = 8; i < 8 + n; i++)
            {
                alpha = (alpha2 * Math.PI) / 180;
                model[i, 0] = DX + ((Convert.ToDouble(R * Math.Cos(alpha)) + dX) * S);
                model[i, 1] = DY;
                model[i, 2] = (Convert.ToDouble(R * Math.Sin(alpha)) + dY) * S;
                alpha2 += inc;
            }

            alpha2 = inc;

            for (int i = 8 + n; i < model.CountPointsModel; i++)
            {
                alpha = (alpha2 * Math.PI) / 180;
                model[i, 0] = DX + ((Convert.ToDouble(R * Math.Cos(alpha)) + dX) * S);
                model[i, 1] = DY - (C * S);
                model[i, 2] = (Convert.ToDouble(R * Math.Sin(alpha)) + dY) * S;
                alpha2 += inc;
            }
        }

        public void ExecuteOperation(int Operation, double DX = 0, double DY = 0, double DZ = 0, 
                                                    double SX = 1, double SY = 1, double SZ = 1,
                                                    double AX = 0, double AY = 0, double AZ = 0)
        {
            switch (Operation)
            {
                case 1:
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Move(model[i, 0], model[i, 1], model[i, 2], DX * S, DY * S, DZ * S);
                        model[i, 0] = temp[0];
                        model[i, 1] = temp[1];
                        model[i, 2] = temp[2];
                    }
                    break;
                case 21:
                    double zeroX1 = model[0, 0] * (1 - SX);
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Scale(model[i, 0], model[i, 1], model[i, 2], SX, SY, SZ);
                        model[i, 0] = temp[0] + zeroX1;
                        model[i, 1] = temp[1];
                        model[i, 2] = temp[2];
                    }
                    break;
                case 22:
                    double zeroY2 = model[0, 1] * (1 - SY);
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Scale(model[i, 0], model[i, 1], model[i, 2], SX, SY, SZ);
                        model[i, 0] = temp[0];
                        model[i, 1] = temp[1] + zeroY2;
                        model[i, 2] = temp[2];
                    }
                    break;
                case 23:
                    double zeroZ3 = model[0, 2] * (1 - SZ);
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Scale(model[i, 0], model[i, 1], model[i, 2], SX, SY, SZ);
                        model[i, 0] = temp[0];
                        model[i, 1] = temp[1];
                        model[i, 2] = temp[2] + zeroZ3;
                    }
                    break;
                case 31:
                    double zeroAY1 = model[0, 1] * (1 - Math.Cos(-(AX * Math.PI) / 180))
                        + model[0, 2] * Math.Sin(-(AX * Math.PI) / 180);
                    double zeroAZ1 = model[0, 2] * (1 - Math.Cos(-(AX * Math.PI) / 180))
                        - model[0, 1] * Math.Sin(-(AX * Math.PI) / 180);
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Rotate(model[i, 0], model[i, 1], model[i, 2], AX, AY, AZ);
                        model[i, 0] = temp[0];
                        model[i, 1] = temp[1] + zeroAY1;
                        model[i, 2] = temp[2] + zeroAZ1;
                    }
                    break;
                case 32:
                    double zeroAX2 = model[0, 0] * (1 - Math.Cos(-(AY * Math.PI) / 180))
                        + model[0, 2] * Math.Sin(-(AY * Math.PI) / 180);
                    double zeroAZ2 = model[0, 2] * (1 - Math.Cos(-(AY * Math.PI) / 180))
                        - model[0, 0] * Math.Sin(-(AY * Math.PI) / 180);
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Rotate(model[i, 0], model[i, 1], model[i, 2], AX, AY, AZ);
                        model[i, 0] = temp[4] + zeroAX2;
                        model[i, 1] = temp[5];
                        model[i, 2] = temp[6] + zeroAZ2;
                    }
                    break;
                case 33:
                    double zeroAX3 = model[0, 0] * (1 - Math.Cos(-(AZ * Math.PI) / 180))
                        + model[0, 1] * Math.Sin(-(AZ * Math.PI) / 180);
                    double zeroAY3 = model[0, 1] * (1 - Math.Cos(-(AZ * Math.PI) / 180))
                        - model[0, 0] * Math.Sin(-(AZ * Math.PI) / 180);
                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] temp = Rotate(model[i, 0], model[i, 1], model[i, 2], AX, AY, AZ);
                        model[i, 0] = temp[8] + zeroAX3;
                        model[i, 1] = temp[9] + zeroAY3;
                        model[i, 2] = temp[10];
                    }
                    break;
            }
        }

        private double[] Move(double x, double y, double z, double dx, double dy, double dz)
        {
            double[] P = { x, y, z, 1 };

            double[,] T = { {1, 0, 0, 0},
                            {0, 1, 0, 0},
                            {0, 0, 1, 0},
                            {dx, dy, dz, 1} };

            double[] PP = { (P[0] * T[0, 0]) + (P[1] * T[1, 0]) + (P[2] * T[2, 0]) + (P[3] * T[3, 0]),
                            (P[0] * T[0, 1]) + (P[1] * T[1, 1]) + (P[2] * T[2, 1]) - (P[3] * T[3, 1]),
                            (P[0] * T[0, 2]) + (P[1] * T[1, 2]) + (P[2] * T[2, 2]) + (P[3] * T[3, 2]),
                            (P[0] * T[0, 3]) + (P[1] * T[1, 3]) + (P[2] * T[2, 3]) + (P[3] * T[3, 3]) };

            return PP;
        }

        private double[] Scale(double x, double y, double z, double sx, double sy, double sz)
        {
            double[] P = { x, y, z, 1 };

            double[,] S = { {sx, 0, 0, 0},
                            {0, sy, 0, 0},
                            {0, 0, sz, 0},
                            {0, 0, 0, 1} };

            double[] PP = { (P[0] * S[0, 0]) + (P[1] * S[1, 0]) + (P[2] * S[2, 0]) + (P[3] * S[3, 0]),
                            (P[0] * S[0, 1]) + (P[1] * S[1, 1]) + (P[2] * S[2, 1]) + (P[3] * S[3, 1]),
                            (P[0] * S[0, 2]) + (P[1] * S[1, 2]) + (P[2] * S[2, 2]) + (P[3] * S[3, 2]),
                            (P[0] * S[0, 3]) + (P[1] * S[1, 3]) + (P[2] * S[2, 3]) + (P[3] * S[3, 3]) };

            return PP;
        }

        private double[] Rotate(double x, double y, double z, double ax, double ay, double az)
        {
            double[] P = { x, y, z, 1 };

            double[,] Rx = { { 1, 0, 0, 0},
                           {0, Math.Cos(-(ax * Math.PI) / 180), Math.Sin(-(ax * Math.PI) / 180), 0},
                           {0, -(Math.Sin(-(ax * Math.PI) / 180)), Math.Cos(-(ax * Math.PI) / 180), 0},
                           {0, 0, 0, 1} };

            double[,] Ry = { {Math.Cos(-(ay * Math.PI) / 180), 0, Math.Sin(-(ay * Math.PI) / 180), 0},
                           {0, 1, 0, 0},
                           {-(Math.Sin(-(ay * Math.PI) / 180)), 0, Math.Cos(-(ay * Math.PI) / 180), 0},
                           {0, 0, 0, 1} };

            double[,] Rz = { {Math.Cos(-(az * Math.PI) / 180), Math.Sin(-(az * Math.PI) / 180), 0, 0},
                           {-(Math.Sin(-(az * Math.PI) / 180)), Math.Cos(-(az * Math.PI) / 180), 0, 0},
                           {0, 0, 1, 0},
                           {0, 0, 0, 1} };

            double[] PP = { (P[0] * Rx[0, 0]) + (P[1] * Rx[1, 0]) + (P[2] * Rx[2, 0]) - (P[3] * Rx[3, 0]),
                            (P[0] * Rx[0, 1]) + (P[1] * Rx[1, 1]) + (P[2] * Rx[2, 1]) + (P[3] * Rx[3, 1]),
                            (P[0] * Rx[0, 2]) + (P[1] * Rx[1, 2]) + (P[2] * Rx[2, 2]) + (P[3] * Rx[3, 2]),
                            (P[0] * Rx[0, 3]) + (P[1] * Rx[1, 3]) + (P[2] * Rx[2, 3]) + (P[3] * Rx[3, 3]),

                            (P[0] * Ry[0, 0]) + (P[1] * Ry[1, 0]) + (P[2] * Ry[2, 0]) - (P[3] * Ry[3, 0]),
                            (P[0] * Ry[0, 1]) + (P[1] * Ry[1, 1]) + (P[2] * Ry[2, 1]) + (P[3] * Ry[3, 1]),
                            (P[0] * Ry[0, 2]) + (P[1] * Ry[1, 2]) + (P[2] * Ry[2, 2]) + (P[3] * Ry[3, 2]),
                            (P[0] * Ry[0, 3]) + (P[1] * Ry[1, 3]) + (P[2] * Ry[2, 3]) + (P[3] * Ry[3, 3]),

                            (P[0] * Rz[0, 0]) + (P[1] * Rz[1, 0]) + (P[2] * Rz[2, 0]) - (P[3] * Rz[3, 0]),
                            (P[0] * Rz[0, 1]) + (P[1] * Rz[1, 1]) + (P[2] * Rz[2, 1]) + (P[3] * Rz[3, 1]),
                            (P[0] * Rz[0, 2]) + (P[1] * Rz[1, 2]) + (P[2] * Rz[2, 2]) + (P[3] * Rz[3, 2]),
                            (P[0] * Rz[0, 3]) + (P[1] * Rz[1, 3]) + (P[2] * Rz[2, 3]) + (P[3] * Rz[3, 3]) };

            return PP;
        }

        public void Projection(string p)
        {
            switch(p)
            {
                case "X":
                    double[,] SX = { {0, 0, 0, 0},
                                     {0, 1, 0, 0},
                                     {0, 0, 1, 0},
                                     {0, 0, 0, 1} };

                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] P = { model[i, 0], model[i, 1], model[i, 2], 1 };

                        double[] PP = { (P[0] * SX[0, 0]) + (P[1] * SX[1, 0]) + (P[2] * SX[2, 0]) + (P[3] * SX[3, 0]),
                                        (P[0] * SX[0, 1]) + (P[1] * SX[1, 1]) + (P[2] * SX[2, 1]) + (P[3] * SX[3, 1]),
                                        (P[0] * SX[0, 2]) + (P[1] * SX[1, 2]) + (P[2] * SX[2, 2]) + (P[3] * SX[3, 2]),
                                        (P[0] * SX[0, 3]) + (P[1] * SX[1, 3]) + (P[2] * SX[2, 3]) + (P[3] * SX[3, 3]) };

                        model[i, 0] = PP[0];
                        model[i, 1] = PP[1];
                        model[i, 2] = PP[2];
                    }
                    break;

                case "Y":
                    double[,] SY = { {1, 0, 0, 0},
                                     {0, 0, 0, 0},
                                     {0, 0, 1, 0},
                                     {0, 0, 0, 1} };

                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] P = { model[i, 0], model[i, 1], model[i, 2], 1 };

                        double[] PP = { (P[0] * SY[0, 0]) + (P[1] * SY[1, 0]) + (P[2] * SY[2, 0]) + (P[3] * SY[3, 0]),
                                        (P[0] * SY[0, 1]) + (P[1] * SY[1, 1]) + (P[2] * SY[2, 1]) + (P[3] * SY[3, 1]),
                                        (P[0] * SY[0, 2]) + (P[1] * SY[1, 2]) + (P[2] * SY[2, 2]) + (P[3] * SY[3, 2]),
                                        (P[0] * SY[0, 3]) + (P[1] * SY[1, 3]) + (P[2] * SY[2, 3]) + (P[3] * SY[3, 3]) };

                        model[i, 0] = PP[0];
                        model[i, 1] = PP[1];
                        model[i, 2] = PP[2];
                    }
                    break;

                case "Z":
                    double[,] SZ = { {1, 0, 0, 0},
                                     {0, 1, 0, 0},
                                     {0, 0, 0, 0},
                                     {0, 0, 0, 1} };

                    for (int i = 0; i < model.CountPointsModel; i++)
                    {
                        double[] P = { model[i, 0], model[i, 1], model[i, 2], 1 };

                        double[] PP = { (P[0] * SZ[0, 0]) + (P[1] * SZ[1, 0]) + (P[2] * SZ[2, 0]) + (P[3] * SZ[3, 0]),
                                        (P[0] * SZ[0, 1]) + (P[1] * SZ[1, 1]) + (P[2] * SZ[2, 1]) + (P[3] * SZ[3, 1]),
                                        (P[0] * SZ[0, 2]) + (P[1] * SZ[1, 2]) + (P[2] * SZ[2, 2]) + (P[3] * SZ[3, 2]),
                                        (P[0] * SZ[0, 3]) + (P[1] * SZ[1, 3]) + (P[2] * SZ[2, 3]) + (P[3] * SZ[3, 3]) };

                        model[i, 0] = PP[0];
                        model[i, 1] = PP[1];
                        model[i, 2] = PP[2];
                    }
                    break;
            }            
        }
    }
}
